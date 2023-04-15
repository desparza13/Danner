const express = require('express');
const router = express.Router();
const controller = require('../controllers/authors')

/**
 * @swagger
 * /authors:
 *  get:
 *    tags:
 *      - Authors
 *    description: list all authors in database
 *    responses:
 *      200:
 *        description: Array with author objects containing data from all authors on the database
 *      400:
 *        description: Something went wrong retrieving all authors
 */
router.get('/',controller.list);

/**
 * @swagger
 * /authors/{id}:
 *  get:
 *    tags:
 *      - Authors
 *    description: list a specific author
 *    parameters:
 *      - in: path
 *        name: id
 *        description: id from author you wish to obtain
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Author object from the specified author
 *      400:
 *        description: Error retrieving author with specified id
 */
router.get('/:id', controller.ver);

/**
 * @swagger
 * /autores:
 *  post:
 *    tags:
 *      - Autores
 *    description: crear un nuevo autor en la base de datos
 *    parameters:
 *      - in: body
 *        name: autorACrear
 *        description: un JSON que contenga la información del autor a crear
 *        required: true
 *        schema: 
 *          type: object
 *          properties:
 *            nombre:
 *              type: string
 *            usuario:
 *              type: string
 *            correo:
 *              type: string
 *            ciudad:
 *              type: string
 *            imagen:
 *              type: string
 *            contraseña:
 *              type: string
 *    responses:
 *      201:
 *        description: Objeto del autor creado correctamente
 *      400:
 *        description: Error al crear el autor 
 */
router.post('/', express.json(), controller.crear);

/**
 * @swagger
 * /autores/{id}:
 *  put:
 *    tags:
 *      - Autores
 *    description: actualizar un autor en específico
 *    parameters:
 *      - in: path
 *        name: id
 *        description: id del autor que se quiere actualizar
 *        required: true
 *        schema:
 *          type: string
 *      - in: body
 *        name: autorActualizado
 *        description: un JSON que contenga la información del autor a actualizar
 *        required: true
 *        schema: 
 *          type: object
 *          properties:
 *            nombre:
 *              type: string
 *            usuario:
 *              type: string
 *            correo:
 *              type: string
 *            ciudad:
 *              type: string
 *            imagen:
 *              type: string
 *            contraseña:
 *              type: string
 *    responses:
 *      200:
 *        description: Actualización de autor exitosa
 *      400:
 *        description: Error al actualizar el autor
 */
router.put('/:id', express.json(), controller.actualizar);

/**
 * @swagger
 * /autores/{id}:
 *  delete:
 *    tags:
 *      - Autores
 *    description: Eliminar un autor de acuerdo a su id
 *    parameters:
 *      - in: path
 *        name: id
 *        description: id del autor a eliminar
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: eliminación exitosa
 *      400:
 *        description: error al eliminar el autor
 */
router.delete('/:id', controller.eliminar);

module.exports = router;
