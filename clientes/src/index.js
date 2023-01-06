
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://deusto:deusto@cluster0.knpxqxl.mongodb.net/clientes?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect()


const express = require("express");
const {join} = require('path');
const morgan = require("morgan");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const docs = require('./docs');
const clienteRouter = require("./clientes");

const app = express();
const PORT = process.env.PORT || 4000;
client.connect();

//let collection=client.db('comercial').collection('clientes')

// app configs.
app.db = client.db('comercial')
app.collection=client.db('Comercial').collection('clientes')
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(morgan("dev"));
app.use(cors());
app.use('/clientes',clienteRouter);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(docs));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "localhost:3000");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    next();
  });

//initialize the app.
async function initialize(){    
    app.listen(PORT);
};

initialize()
    .finally(
        () => console.log(`app started on port:${PORT}`)
    );
