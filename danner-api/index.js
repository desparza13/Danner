const path = require('path');
const express = require('express');
const rutas = require('./rutas');
const router = require('./src/routes');
const mongoose = require('mongoose');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerConf = require('./swagger.config');
const socketIo = require('socket.io');


require('dotenv').config();

const app = express();

const mongoUrl = process.env.MONGO_URL;

const port=3000;
app.use('/assets',express.static(path.join(__dirname,'assets'))); 

const swaggerDocs= swaggerJsDoc(swaggerConf);
app.use((req,res,next)=>{
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
    // Pass to next layer of middleware
    next();
});
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use('/',router); 
rutas(app); 

mongoose.connect(mongoUrl).then(()=>{
    const server = app.listen(port,function(){
        console.log(mongoUrl);
        console.log('app is running in port '+port)
    });

    const io = socketIo(server,{
        cors: {
            origin: '*',
            methods: ['GET','POST'],
        }
    })
    
    io.on('connection',socket=>{
        io.emit('Se conecto alguien');
    
        socket.on('joinBookDetails',(data)=>{ 
            let idBook = data.idBook;
            socket.join(idBook)
        })
        socket.on('leaveBookDetails',(data)=>{
            let idBook = data.idBook;
            socket.leave(idBook)
        })
        socket.on('sendReview',(data)=>{
            let idBook = data.bookId
            socket.to(idBook).emit('newReview', data)
        })
    })
}).catch(err=>{
    console.log(mongoUrl);
    console.log("No se pudo conectar a la base de datos", err);
})

