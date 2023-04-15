const path = require('path');
const express = require('express');
const rutas = require('./rutas');
const router = require('./src/routes');
const mongoose = require('mongoose');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerConf = require('./swagger.config');
require('dotenv').config();

const app = express();

const mongoUrl = process.env.MONGO_URL;

const port=3000;
app.use('/assets',express.static(path.join(__dirname,'assets'))); 

const swaggerDocs= swaggerJsDoc(swaggerConf);
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use('/',router); 
rutas(app); 

mongoose.connect(mongoUrl).then(()=>{
    app.listen(port,function(){
        console.log(mongoUrl);
        console.log('app is running in port '+port)
    });
}).catch(err=>{
    console.log(mongoUrl);
    console.log("No se pudo conectar a la base de datos", err);
})