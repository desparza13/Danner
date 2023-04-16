const express = require('express');
const router = express.Router();
const controller = require('../controllers/readers')

/**
 * @swagger
 *   /readers:
 *   get:
 *      tags: 
 *        - Readers
 *      description: Enlistar todos los readers en la base de datos
 *      responses:
 *        200:
 *          description: Arreglo con objetos lector con el resultado de todos los readers en la base de datos
 *        400:
 *          description: Algo salió mal al recuperar los readers
 */
router.get('/',controller.list);

/**
 * @swagger
 * /readers/{id}:
 *  get:
 *    tags: 
 *      - Readers
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
router.get('/:id', controller.see);

/**
 * @swagger
 * /readers:
 *  post:
 *    tags:
 *      - Readers
 *    description: crear un nuevo lector en la base de datos
 *    parameters:
*      - in: body
 *        name: lectorACrear
 *        description: un JSON que contenga la información del lector a crear
 *        required: true
 *        schema: 
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            user:
 *              type: string
 *            email:
 *              type: string
 *            city:
 *              type: string
 *            image:
 *              type: string
 *            password:
 *              type: string
 *            read:
 *              type: array
 *              items:
 *                type: array
 *                items:
 *                  oneOf:
 *                    - type: string
 *                    - type: string
 *            toBeRead:
 *              type: array
 *              items:
 *                type: string
 *            reading:
 *              type: array
 *              items:
 *                type: array
 *                items:
 *                  oneOf:
 *                    - type: string
 *                    - type: number
 *            friends:
 *              type: array
 *              items:
 *                type: string
 *    responses:
 *      201:
 *        description: Objeto del autor creado correctamente
 *      400:
 *        description: Error al crear el autor 
 */
router.post('/', express.json(), controller.create);

/**
 * @swagger
 * /readers/{id}:
 *  put:
 *    tags: 
 *      - Readers
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
 *            name:
 *              type: string
 *            user:
 *              type: string
 *            email:
 *              type: string
 *            city:
 *              type: string
 *            image:
 *              type: string
 *            password:
 *              type: string
 *            read:
 *              type: array
 *              items:
 *                type: array
 *                items:
 *                  oneOf:
 *                    - type: string
 *                    - type: string
 *            toBeRead:
 *              type: array
 *              items:
 *                type: string
 *            reading:
 *              type: array
 *              items:
 *                type: array
 *                items:
 *                  oneOf:
 *                    - type: string
 *                    - type: number
 *            friends:
 *              type: array
 *              items:
 *                type: string
 *    responses:
 *      200:
 *        description: Actualización de lector exitosa
 *      400:
 *        description: Error al actualizar el lector
 */
router.put('/:id', express.json(), controller.update);

/**
 * @swagger
 * /readers/{id}:
 *  delete:
 *    tags: 
 *      - Readers
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
router.delete('/:id', controller.delete);

module.exports = router;
