const express = require('express');
const router = express.Router();
const controller = require('../controllers/solicitudesAmistad')

/**
 * @swagger
 * /solicitudes:
 *  get:
 *    tags:
 *      - SolicitudesDeAmistad
 *    description: enlistar todas las solicitudes de amistad en la base de datos
 *    responses:
 *      200:
 *        description: Arreglo con objetos solicitud con el resultado de todas las solicitudes
 *      400:
 *        description: Algo salió mal al recuperar las solicitudes
 */
router.get('/',controller.listar);

/**
 * @swagger
 * /solicitudes/{id}:
 *  get:
 *    tags:
 *      - SolicitudesDeAmistad
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
router.get('/:id', controller.ver);

/**
 * @swagger
 * /solicitudes:
 *  post:
 *    tags:
 *      - SolicitudesDeAmistad
 *    description: crear una nueva solicitud de amistad en la base de datos
 *    parameters:
 *      - in: body
 *        name: solicitudACrear
 *        description: un JSON que contenga la información de la solicitud de amistad a crear
 *        required: true
 *        schema: 
 *          type: object
 *          properties:
 *            idUsuarioEnvio:
 *              type: string
 *            idUsuarioRecepcion:
 *              type: string
 *            estadoSolicitud:
 *              type: boolean
 *    responses:
 *      201:
 *        description: Objeto de la solicitud de amistad creada correctamente
 *      400:
 *        description: Error al crear la solicitud de amistad 
 */
router.post('/', express.json(), controller.crear);

/**
 * @swagger
 * /solicitudes/{id}:
 *  put:
 *    tags:
 *      - SolicitudesDeAmistad
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
 *            idUsuarioEnvio:
 *              type: string
 *            idUsuarioRecepcion:
 *              type: string
 *            estadoSolicitud:
 *              type: boolean
 *    responses:
 *      200:
 *        description: Actualización de solicitud de amistad exitosa
 *      400:
 *        description: Error al actualizar la solicitud de amistad
 */
router.put('/:id', express.json(), controller.actualizar);

/**
 * @swagger
 * /solicitudes/{id}:
 *  delete:
 *    tags:
 *      - SolicitudesDeAmistad
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
router.delete('/:id', controller.eliminar);

module.exports = router;
