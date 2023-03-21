const router = require('express').Router();

const rutaAutores = require('./autores')
const rutaLectores = require('./lectores')

router.use('/autores',rutaAutores);
router.use('/lectores',rutaLectores);

module.exports = router;