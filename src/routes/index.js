const router = require('express').Router();

const rutaAutores = require('./autores')
const rutaLectores = require('./lectores')
const rutaLibros = require('./libros')
const rutaReviews = require('./reviews')
const rutaSolicitudes = require('./solicitudesAmistad')

router.use('/autores',rutaAutores);
router.use('/lectores',rutaLectores);
router.use('/libros',rutaLibros);
router.use('/reviews',rutaReviews);
router.use('/solicitudes',rutaSolicitudes);

module.exports = router;