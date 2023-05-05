const express = require('express');
const router = express.Router();
const controller = require('../controllers/readers')


router.post('/login',express.json(), controller.login);
router.post('/login/google', express.json(), controller.googleLogin);

/**
 * @swagger
 * /readers:
 *   get:
 *     tags: 
 *       - Readers
 *     description: List all readers in database
 *     responses:
 *       200:
 *         description: Array with reader objects containg data from all readers on the database
 *       400:
 *         description: Something went wrong retrieving all readers
 */
router.get('/',controller.list);

/**
 * @swagger
 * /readers/{id}:
 *  get:
 *    tags: 
 *      - Readers
 *    description: List certain reader in database
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Reader's ID
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Reader object from the specified reader
 *      400:
 *        description: Error retrieving reader with specified id
 */
router.get('/:id', controller.see);

/**
 * @swagger
 * /readers:
 *  post:
 *    tags:
 *      - Readers
 *    description: Create a new reader on the database
 *    parameters:
*      - in: body
 *        name: newReader
 *        description: JSON with the new reader information
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
 *                    bookID:
 *                      type: string
 *                    finishedDate:
 *                      type: string
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
 *        description: Reader's object successfully created
 *      400:
 *        description: Something went wrong while creating the reader
 */
router.post('/', express.json(), controller.create);

/**
 * @swagger
 * /readers/{id}:
 *  put:
 *    tags: 
 *      - Readers
 *    description: Update certain reader
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Reader's ID
 *        required: true
 *        schema:
 *          type: string
 *      - in: body
 *        name: updatedReader
 *        description: JSON with the updated reader's information
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
 *        description: Reader successfully updated
 *      400:
 *        description: Something went wrong while updating the reader
 */
router.put('/:id', express.json(), controller.update);

/**
 * @swagger
 * /readers/{id}:
 *  delete:
 *    tags: 
 *      - Readers
 *    description: Delete certain reader
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Reader's ID
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Reader successfully deleted
 *      400:
 *        description: Something went wrong while deleting the book
 */
router.delete('/:id', controller.delete);

module.exports = router;
