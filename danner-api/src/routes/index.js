const router = require('express').Router();
require('dotenv').config();

const authorKey = process.env.AUTHOR_KEY;
const readerKey = process.env.READER_KEY;
const jwt = require('jsonwebtoken');

const authorsRoute = require('./authors')
const readersRoute = require('./readers')
const booksRoute = require('./books')
const reviewsRoute = require('./reviews')
const requestsRoute = require('./friendshipRequests')
const path = require('path');

router.use('/authors',authorsRoute);
router.use('/readers',readersRoute);
router.use('/books',booksRoute);
router.use('/reviews',reviewsRoute);
router.use('/requests',requestsRoute);
router.get('/image/:filename', (req, res) => {
    res.sendFile(path.join(__dirname, '../../uploads', req.params.filename));
});
router.get('/decode/:token',function(req,res){ //Ruta para decodificar el token
    console.log('Entre');
    const tok = req.params.token
    console.log(tok);
    try{
        var decoded = jwt.verify(tok, authorKey); //intentar decodificar con llave de autor
        res.status(200).send(decoded);
    }catch(err){
        try {
            var decoded = jwt.verify(tok, readerKey);//intentar decodificar con llave de lector
            res.status(200).send(decoded);
        } catch (error) {
            res.status(400).send('Something went wrong '+ err);
        }
    }
});
module.exports = router;