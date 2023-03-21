const router = require('express').Router();

const rutaAutores = require('./autores')
router.use('/autores',rutaAutores);

module.exports = router;