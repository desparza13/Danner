const express = require('express');
const router = express.Router();
const controller = require('../controllers/lectores')

/**
 * @swagger
 * /lectores:
 *  get:
 *    description: Enlistar todos los lectores en la base de datos
 *    responses:
 *      200:
 *        description: Arreglo con objetos lector con el resultado de todos los lectores en la base de datos
 *      400:
 *        description: Algo salió mal al recuperar los lectores
 */
router.get('/',controller.listar);

/**
 * @swagger
 * /lectores/{id}:
 *  get:
 *    description: Listar un lector en específico
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Id de el lector a obtener
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Objeto del lector con el id especificado
 *      400:
 *        description: Error al encontrar el objeto con ese id
 */
router.get('/:id', controller.ver);

/**
 * @swagger
 * /lectores:
 *  post:
 *    description: crear un nuevo lector en la base de datos
 *    parameters:
 *      - in: body
 *        name: lectorACrear
 *        description: un JSON que contenga la información del lector a crear
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
 *            leidos:
 *              type: array
 *              items:
 *                type: array
 *                items:
 *                  oneOf:
 *                    - type: string
 *                    - type: date
 *    responses:
 *      201:
 *        description: Objeto del lector creado correctamente
 *      400:
 *        description: Error al crear el lector 
 */
router.post('/', express.json(), controller.crear);

/**
 * @swagger
 * /autores/{id}:
 *  put:
 *    description: actualizar un lector en específico
 *    parameters:
 *      - in: path
 *        name: id
 *        description: id del lector que se quiere actualizar
 *        required: true
 *        schema:
 *          type: string
 *      - in: body
 *        name: lectorActualizado
 *        description: un JSON que contenga la información del lector actualizado
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
 *            leidos:
 *              type: array
 *              items:
 *                type: array
 *                items:
 *                  oneOf:
 *                    - type: string
 *                    - type: date
 *    responses:
 *      200:
 *        description: Actualización de lector exitosa
 *      400:
 *        description: Error al actualizar el lector
 */
router.put('/:id', express.json(), controller.actualizar);

/**
 * @swagger
 * /lectores/{id}:
 *  delete:
 *    description: Eliminar un lector de acuerdo a su id
 *    parameters:
 *      - in: path
 *        name: id
 *        description: id del lector a eliminar
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: eliminación exitosa
 *      400:
 *        description: error al eliminar el lector
 */
router.delete('/:id', controller.eliminar);

module.exports = router;
