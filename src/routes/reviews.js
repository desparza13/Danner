const express = require('express');
const router = express.Router();
const controller = require('../controllers/reviews')

/**
 * @swagger
 * /reviews:
 *  get:
 *    tags:
 *      - Reviews
 *    description: enlistar todas las reseñas/reviews en la base de datos
 *    responses:
 *      200:
 *        description: Arreglo con objetos review con el resultado de todos las reviews
 *      400:
 *        description: Algo salió mal al recuperar las reviews
 */
router.get('/',controller.listar);

/**
 * @swagger
 * /reviews/{id}:
 *  get:
 *    tags:
 *      - Reviews
 *    description: listar un review en específico
 *    parameters:
 *      - in: path
 *        name: id
 *        description: id de el review a obtener
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Objeto del review con el id especificado
 *      400:
 *        description: Error al encontrar el objeto con ese id
 */
router.get('/:id', controller.ver);

/**
 * @swagger
 * /reviews:
 *  post:
 *    tags:
 *      - Reviews
 *    description: crear un nuevo review en la base de datos
 *    parameters:
 *      - in: body
 *        name: libroACrear
 *        description: un JSON que contenga la información del review a crear
 *        required: true
 *        schema: 
 *          type: object
 *          properties:
 *            idLibro:
 *              type: string
 *            idUsuario:
 *              type: string
 *            puntaje:
 *              type: number
 *            descripcion:
 *              type: string
 *    responses:
 *      201:
 *        description: Objeto del review creado correctamente
 *      400:
 *        description: Error al crear el review 
 */
router.post('/', express.json(), controller.crear);

/**
 * @swagger
 * /reviews/{id}:
 *  put:
 *    tags:
 *      - Reviews
 *    description: actualizar un review en específico
 *    parameters:
 *      - in: path
 *        name: id
 *        description: id del review que se quiere actualizar
 *        required: true
 *        schema:
 *          type: string
 *      - in: body
 *        name: reviewActualizado
 *        description: un JSON que contenga la información del review a actualizar
 *        required: true
 *        schema: 
 *          type: object
 *          properties:
 *            idLibro:
 *              type: string
 *            idUsuario:
 *              type: string
 *            puntaje:
 *              type: number
 *            descripcion:
 *              type: string
 *    responses:
 *      200:
 *        description: Actualización de review exitosa
 *      400:
 *        description: Error al actualizar el review
 */
router.put('/:id', express.json(), controller.actualizar);

/**
 * @swagger
 * /reviews/{id}:
 *  delete:
 *    tags:
 *      - Reviews
 *    description: Eliminar un review de acuerdo a su id
 *    parameters:
 *      - in: path
 *        name: id
 *        description: id del review a eliminar
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: eliminación exitosa
 *      400:
 *        description: error al eliminar el review
 */
router.delete('/:id', controller.eliminar);

module.exports = router;
