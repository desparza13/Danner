const express = require('express');
const router = express.Router();
const controller = require('../controllers/friendshipRequests')

/**
 * @swagger
 * /requests:
 *  get:
 *    tags:
 *      - FriendshipRequests
 *    description: List all friendship requests in database
 *    responses:
 *      200:
 *        description: Array with request objects containing data from all requests on the database
 *      400:
 *        description: Something went wrong retrieving all friendship requests
 */
router.get('/',controller.list);

/**
 * @swagger
 * /requests/{id}:
 *  get:
 *    tags:
 *      - FriendshipRequests
 *    description: List certain friendship request
 *    parameters:
 *      - in: path
 *        name: id
 *        description: ID from request you wish to obtain
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Request object from the specified request
 *      400:
 *        description: Error retrieving frienship request with specified id
 */
router.get('/:id', controller.see);

/**
 * @swagger
 * /requests:
 *  post:
 *    tags:
 *      - FriendshipRequests
 *    description: Create a new friendship request on the database
 *    parameters:
 *      - in: body
 *        name: newRequest
 *        description: JSON with the new friendship request information
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
 *        description: Friendship request object successfully created
 *      400:
 *        description: Something went wrong while creating the friendship request 
 */
router.post('/', express.json(), controller.create);

/**
 * @swagger
 * /requests/{id}:
 *  put:
 *    tags:
 *      - FriendshipRequests
 *    description: Update certain friendship request
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Friendship request's ID
 *        required: true
 *        schema:
 *          type: string
 *      - in: body
 *        name: updatedRequest
 *        description: JSON with the updated request's information
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
 *        description: Friendship request successfully updated
 *      400:
 *        description: Something went wrong while updating the friendship request
 */
router.put('/:id', express.json(), controller.update);

/**
 * @swagger
 * /requests/{id}:
 *  delete:
 *    tags:
 *      - FriendshipRequests
 *    description: Delete certain request
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Friendship request's ID
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Frienship request successfully deleted
 *      400:
 *        description: Something went wrong while deleting the friendship request
 */
router.delete('/:id', controller.delete);

module.exports = router;
