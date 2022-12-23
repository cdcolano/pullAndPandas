const express =require('express');
//const {nanoid} = require('nanoid');
const router = express.Router();

const idLength = 8;

router.get('/', async(req,res) => {
   
    let clientes = await res.app.collection.find({}).toArray();
    console.log(clientes)
      
    res.status(200).send(clientes)
});

router.get('/:id', async(req,res) => {
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
            ...req.body
        };

        try {

            req.app.collection.insertOne(cliente);
            
            return res.status(201).send("Client saved successfully");

        }catch(error){

            return res.status(500).send(error);
        }
    // }else{
    //     console.log(cliente)
    //     return res.sendStatus(403);
    // }
});

router.post('/:id', (req,res) => {
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
                email:req.body.email,
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

router.delete('/:id', async(req,res) => {
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
            await req.app.collection.deleteOne({
                id_cliente:id
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
