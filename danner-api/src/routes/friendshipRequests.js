const express = require('express');
const router = express.Router();
const controller = require('../controllers/friendshipRequests')

/**
 * @swagger
 * /requests:
 *  get:
 *    tags:
 *      - FriendshipRequests
 *    description: enlistar todas las requests de amistad en la base de datos
 *    responses:
 *      200:
 *        description: Arreglo con objetos solicitud con el resultado de todas las requests
 *      400:
 *        description: Algo salió mal al recuperar las requests
 */
router.get('/',controller.list);

/**
 * @swagger
 * /requests/{id}:
 *  get:
 *    tags:
 *      - FriendshipRequests
 *    description: listar una solicitud de amistad en específico
 *    parameters:
 *      - in: path
 *        name: id
 *        description: id de la solicitud de amistad a obtener
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Objeto de la solicitud de amistad con el id especificado
 *      400:
 *        description: Error al encontrar el objeto con ese id
 */
router.get('/:id', controller.see);

/**
 * @swagger
 * /requests:
 *  post:
 *    tags:
 *      - FriendshipRequests
 *    description: crear una nueva solicitud de amistad en la base de datos
 *    parameters:
 *      - in: body
 *        name: solicitudACrear
 *        description: un JSON que contenga la información de la solicitud de amistad a crear
 *        required: true
 *        schema: 
 *          type: object
 *          properties:
 *            idSender:
 *              type: string
 *            idReceiver:
 *              type: string
 *            status:
 *              type: boolean
 *    responses:
 *      201:
 *        description: Objeto de la solicitud de amistad creada correctamente
 *      400:
 *        description: Error al crear la solicitud de amistad 
 */
router.post('/', express.json(), controller.create);

/**
 * @swagger
 * /requests/{id}:
 *  put:
 *    tags:
 *      - FriendshipRequests
 *    description: actualizar una solicitud de amistad en específico
 *    parameters:
 *      - in: path
 *        name: id
 *        description: id de la solicitud de amistad que se quiere actualizar
 *        required: true
 *        schema:
 *          type: string
 *      - in: body
 *        name: solicitudActualizada
 *        description: un JSON que contenga la información del review a actualizar
 *        required: true
 *        schema: 
 *          type: object
 *          properties:
 *            idSender:
 *              type: string
 *            idReceiver:
 *              type: string
 *            status:
 *              type: boolean
 *    responses:
 *      200:
 *        description: Actualización de solicitud de amistad exitosa
 *      400:
 *        description: Error al actualizar la solicitud de amistad
 */
router.put('/:id', express.json(), controller.update);

/**
 * @swagger
 * /requests/{id}:
 *  delete:
 *    tags:
 *      - FriendshipRequests
 *    description: Eliminar una solicitud de amistad de acuerdo a su id
 *    parameters:
 *      - in: path
 *        name: id
 *        description: id de la solicitud de amistad a eliminar
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: eliminación exitosa
 *      400:
 *        description: error al eliminar la solicitud de amistad
 */
router.delete('/:id', controller.delete);

module.exports = router;
