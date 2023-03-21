const express = require('express');
const router = express.Router();
const controller = require('../controllers/autores')

/**
 * @swagger
 * /autores:
 *  get:
 *    description: enlistar todos los autores en la base de datos
 *    responses:
 *      200:
 *        description: Arreglo con objetos autor con el resultado de todos los autores
 *      400:
 *        description: Algo salió mal al recuperar los autores
 */
router.get('/',controller.listar);

/**
 * @swagger
 * /autores/{id}:
 *  get:
 *    description: listar un autor en específico
 *    parameters:
 *      - in: path
 *        name: id
 *        description: id de el autor a obtener
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Objeto del autor con el id especificado
 *      400:
 *        description: Error al encontrar el objeto con ese id
 */
router.get('/:id', controller.ver);

/**
 * @swagger
 * /autores:
 *  post:
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
 *        description: error al eliminar la tarea
 */
router.delete('/:id', controller.eliminar);

module.exports = router;
