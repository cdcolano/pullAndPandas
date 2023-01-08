const express =require('express');
const jwt = require('jsonwebtoken');
//const {nanoid} = require('nanoid');
const router = express.Router();

const JWT_SECRET_KEY = "gfg_jwt_secret_key"
  
const TOKEN_HEADER_KEY = "gfg_token_header_key"
const idLength = 8;

function verifyToken(req, res, next) {
    console.log(req.headers)
    let token = req.header('authorization')
    token = token.replace(/^Bearer\s+/, "");
    console.log(token)
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
        const verified = jwt.verify(token,JWT_SECRET_KEY)
        console.log(verified)
        req.user = verified
        next() // continuamos
    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }
 }

router.get('/', async(req,res) => {
   
    let clientes = await res.app.collection.find({inactive:0}).toArray();
    console.log(clientes)
      
    res.status(200).send(clientes)
});

router.get('/user',verifyToken, async(req,res) => {
    try {
        let token = req.header('authorization')
        token = token.replace(/^Bearer\s+/, "");
        decoded = jwt.verify(token, JWT_SECRET_KEY);
    } catch (e) {
        console.log(e)
        return res.status(401).send('unauthorized');
    }
    let cliente =await req.app.collection.findOne({
        id_cliente: decoded.userId
    });
      
    res.status(200).send(cliente)
});



router.get('/:id(\\d+)', async(req,res) => {
    let id=parseInt(req.params.id)
    if(id){
        //find todo.
        let cliente = await req.app.collection.findOne({
            id_cliente:id,
            inactive:0
        });
        console.log(cliente)
        if(cliente===null){
            return res.sendStatus(404);
        };
        return res.send(cliente)
    }else{
        return res.status(404).send("Could not find a client, because id was not a number")
    }
});

router.post('/', async(req,res) => {
    // let cliente = req.app.collection.find({ 
    //     email: req.params.email
    // });
    //if (!cliente){
        let cliente = {
            id_cliente:await req.app.collection.count()+1,
            inactive:0,
            ...req.body
        };

        try {

            req.app.collection.insertOne(cliente);
            let jwtSecretKey = JWT_SECRET_KEY;
            let data = {
                time: Date(),
                userId: cliente.id_cliente
            }
          
            const token = jwt.sign(data, jwtSecretKey,{ expiresIn:3600*24});
            return res.send({access_token:token,
                type:"bearer",role:0});
        }catch(error){

            return res.status(500).send(error);
        }
    // }else{
    //     console.log(cliente)
    //     return res.sendStatus(403);
    // }
});

router.post('/:id(\\d+)',verifyToken, (req,res) => {
    let id=parseInt(req.params.id)
    console.log(id)
    if (!id){
        return res.status(404).send("ID is not numerical")
    }
    //find todo.
    let cliente = req.app.collection.findOne({
        id_cliente: id
    });

    if(cliente===null){

        return res.sendStatus(404);

    };

    //update that todo.
    try {

        req.app.collection.updateOne({
            id_cliente:id
        },{
            $set:{
                //TODO
                nombre:req.body.nombre,
                password:req.body.password,
                peso:req.body.peso,
                altura:req.body.altura,
                edad:req.body.edad,
                //talla_recomendada: calcula_talla()
            }
        })
        

        return res.send("Client updated");

    } catch(error) {

        res.status(500);

        return res.send(error);

    };

});

router.post('/signin', async(req,res) => {
    //find todo
    let email=req.body.email
    if (!email){
       email=req.body.username
    }
    let cliente =await req.app.collection.findOne({
        email: email,
        inactive:0
    });
    console.log(cliente)
    if(cliente===null){
        console.log("No existe")
        return res.sendStatus(404);

    };

    //update that todo.
    if (cliente.password===req.body.password){
        let jwtSecretKey = JWT_SECRET_KEY;
        let data = {
            time: Date(),
            userId: cliente.id_cliente,
        }
      
        const token = jwt.sign(data, jwtSecretKey,{ expiresIn:3600*24});
        return res.send({access_token:token,
            type:"bearer",role:0});
    }else{
        return res.sendStatus(403)
    }

});



router.delete('/:id',verifyToken, async(req,res) => {
    let id=parseInt(req.params.id)
    console.log(id)
    if(id){
        //find todo.
        let cliente = await req.app.collection.findOne({
            id_cliente:id
        });
        console.log(cliente)
        if(cliente===null){
            return res.sendStatus(404);
        };

    // delete the todo.
        try {
            req.app.collection.updateOne({
                id_cliente:id
            },{
                $set:{
                    //TODO
                    inactive:1
                    //talla_recomendada: calcula_talla()
                }
            })

            return res.send("Cliente deleted");

        } catch(error) {

            return res.sendStatus(500);

        }
    }else{
        return res.status(500).send("El id no es numerico")
    }

});

module.exports = router;
