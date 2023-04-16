const express = require('express');
const router = express.Router();
const controller = require('../controllers/reviews')

/**
 * @swagger
 * /reviews:
 *  get:
 *    tags:
 *      - Reviews
 *    description: List all reviews in database
 *    responses:
 *      200:
 *        description: Array with reviews objects containing data from all books on the database
 *      400:
 *        description: Something went wrong retrieving all reviews
 */
router.get('/',controller.list);

/**
 * @swagger
 * /reviews/{id}:
 *  get:
 *    tags:
 *      - Reviews
 *    description: List certain revie
 *    parameters:
 *      - in: path
 *        name: id
 *        description: ID from review you wish to obtain
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Review object from the specified review
 *      400:
 *        description: Error retrieving review with specified id
 */
router.get('/:id', controller.see);

/**
 * @swagger
 * /reviews:
 *  post:
 *    tags:
 *      - Reviews
 *    description: Create a new revie on the database
 *    parameters:
 *      - in: body
 *        name: newReview
 *        description: JSON with the new review information
 *        required: true
 *        schema: 
 *          type: object
 *          properties:
 *            bookId:
 *              type: string
 *            userId:
 *              type: string
 *            rating:
 *              type: number
 *            description:
 *              type: string
 *    responses:
 *      201:
 *        description: Book object successfully created
 *      400:
 *        description: Something went wrong while creating the review 
 *
 */
router.post('/', express.json(), controller.create);

/**
 * @swagger
 * /reviews/{id}:
 *  put:
 *    tags:
 *      - Reviews
 *    description: Update certain review
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Review's ID
 *        required: true
 *        schema:
 *          type: string
 *      - in: body
 *        name: updatedReview
 *        description: JSON with the updated book's information
 *        required: true
 *        schema: 
 *          type: object
 *          properties:
 *            bookId:
 *              type: string
 *            userId:
 *              type: string
 *            rating:
 *              type: number
 *            description:
 *              type: string
 *    responses:
 *      200:
 *        description: Review successfully updated
 *      400:
 *        description: Something went wrong while updating the review
 */
router.put('/:id', express.json(), controller.update);

/**
 * @swagger
 * /reviews/{id}:
 *  delete:
 *    tags:
 *      - Reviews
 *    description: Delete certain review
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Review's ID
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Review successfully deleted
 *      400:
 *        description: Something went wrong while deleting the review
 */
router.delete('/:id', controller.delete);

module.exports = router;
