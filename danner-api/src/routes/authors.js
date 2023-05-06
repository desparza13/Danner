const express = require('express');
const router = express.Router();
const controller = require('../controllers/authors')

router.post('/login',express.json(), controller.login);
router.post('/login/google', express.json(), controller.googleLogin);
router.post('/decode',express.json(),controller.decode);
/**
 * @swagger
 * /authors:
 *  get:
 *    tags:
 *      - Authors
 *    description: List all authors in database
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
 *    description: List certain author
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
router.get('/:id', controller.see);

/**
 * @swagger
 * /authors:
 *  post:
 *    tags:
 *      - Authors
 *    description: Create a new author on the database
 *    parameters:
 *      - in: body
 *        name: newAuthor
 *        description: JSON with the new author information
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
 *    responses:
 *      201:
 *        description: Author object successfully created
 *      400:
 *        description: Something went wrong while creating the author
 */
router.post('/', express.json(), controller.create);

/**
 * @swagger
 * /authors/{id}:
 *  put:
 *    tags:
 *      - Authors
 *    description: Update certain author
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Author's ID
 *        required: true
 *        schema:
 *          type: string
 *      - in: body
 *        name: updatedAuthor
 *        description: JSON with the updated author's information
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
 *    responses:
 *      200:
 *        description: Author successfully updated
 *      400:
 *        description: Something went wrong while updating the author
 */
router.put('/:id', express.json(), controller.update);

/**
 * @swagger
 * /authors/{id}:
 *  delete:
 *    tags:
 *      - Authors
 *    description: Delete certain author 
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Author's id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Author successfully deleted
 *      400:
 *        description: Something went wrong while deleting the author
 */
router.delete('/:id', controller.delete);

module.exports = router;
