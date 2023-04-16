const express = require('express');
const router = express.Router();
const controller = require('../controllers/books')

/**
 * @swagger
 * /books:
 *  get:
 *    tags:
 *      - Books
 *    description: enlistar todos los books en la base de datos
 *    responses:
 *      200:
 *        description: Arreglo con objetos libro con el resultado de todos los books
 *      400:
 *        description: Algo salió mal al recuperar los books
 */
router.get('/',controller.list);

/**
 * @swagger
 * /books/{id}:
 *  get:
 *    tags:
 *      - Books
 *    description: listar un libro en específico
 *    parameters:
 *      - in: path
 *        name: id
 *        description: id de el libro a obtener
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Objeto del libro con el id especificado
 *      400:
 *        description: Error al encontrar el objeto con ese id
 */
router.get('/:id', controller.see);

/**
 * @swagger
 * /books:
 *  post:
 *    tags:
 *      - Books
 *    description: crear un nuevo libro en la base de datos
 *    parameters:
 *      - in: body
 *        name: libroACrear
 *        description: un JSON que contenga la información del libro a crear
 *        required: true
 *        schema: 
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *            date:
 *              type: string
 *            genre:
 *              type: string
 *            author:
 *              type: string
 *            averageRating:
 *              type: number
 *            description:
 *              type: string
 *            pages:
 *              type: number
 *    responses:
 *      201:
 *        description: Objeto del libro creado correctamente
 *      400:
 *        description: Error al crear el libro 
 */
router.post('/', express.json(), controller.create);

/**
 * @swagger
 * /books/{id}:
 *  put:
 *    tags:
 *      - Books
 *    description: actualizar un libro en específico
 *    parameters:
 *      - in: path
 *        name: id
 *        description: id del libro que se quiere actualizar
 *        required: true
 *        schema:
 *          type: string
 *      - in: body
 *        name: libroActualizado
 *        description: un JSON que contenga la información del libro a actualizar
 *        required: true
 *        schema: 
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *            date:
 *              type: string
 *            genre:
 *              type: string
 *            author:
 *              type: string
 *            averageRating:
 *              type: number
 *            description:
 *              type: string
 *            pages:
 *              type: number
 *    responses:
 *      200:
 *        description: Actualización de libro exitosa
 *      400:
 *        description: Error al actualizar el libro
 */
router.put('/:id', express.json(), controller.update);

/**
 * @swagger
 * /books/{id}:
 *  delete:
 *    tags:
 *      - Books
 *    description: Eliminar un libro de acuerdo a su id
 *    parameters:
 *      - in: path
 *        name: id
 *        description: id del libro a eliminar
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: eliminación exitosa
 *      400:
 *        description: error al eliminar el libro
 */
router.delete('/:id', controller.delete);

module.exports = router;
