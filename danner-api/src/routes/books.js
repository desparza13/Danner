const express = require('express');
const router = express.Router();
const controller = require('../controllers/books')

/**
 * @swagger
 * /books:
 *  get:
 *    tags:
 *      - Books
 *    description: List all books in database
 *    responses:
 *      200:
 *        description: Array with book objects containing data from all books on the database
 *      400:
 *        description: Something went wrong retrieving all books
 */
router.get('/',controller.list);

/**
 * @swagger
 * /books/{id}:
 *  get:
 *    tags:
 *      - Books
 *    description: List certain book
 *    parameters:
 *      - in: path
 *        name: id
 *        description: ID from book you wish to obtain
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Book object from the specified book
 *      400:
 *        description: Error retrieving book with specified id
 */
router.get('/:id', controller.see);

/**
 * @swagger
 * /books:
 *  post:
 *    tags:
 *      - Books
 *    description: Create a new book on the database
 *    parameters:
 *      - in: body
 *        name: newBook
 *        description: JSON with the new book information
 *        required: true
 *        schema: 
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *            date:
 *              type: string
 *            genre:
 *              type: string
 *            author:
 *              type: string
 *            averageRating:
 *              type: number
 *            description:
 *              type: string
 *            pages:
 *              type: number
 *    responses:
 *      201:
 *        description: Book object successfully created
 *      400:
 *        description: Something went wrong while creating the book 
 */
router.post('/', express.json(), controller.create);

/**
 * @swagger
 * /books/{id}:
 *  put:
 *    tags:
 *      - Books
 *    description: Update certain book
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Book's ID
 *        required: true
 *        schema:
 *          type: string
 *      - in: body
 *        name: updatedBook
 *        description: JSON with the updated book's information
 *        required: true
 *        schema: 
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *            date:
 *              type: string
 *            genre:
 *              type: string
 *            author:
 *              type: string
 *            averageRating:
 *              type: number
 *            description:
 *              type: string
 *            pages:
 *              type: number
 *    responses:
 *      200:
 *        description: Book successfully updated
 *      400:
 *        description: Something went wrong while updating the book
 */
router.put('/:id', express.json(), controller.update);

/**
 * @swagger
 * /books/{id}:
 *  delete:
 *    tags:
 *      - Books
 *    description: Delete certain book
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Book's ID
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Book successfully deleted
 *      400:
 *        description: Something went wrong while deleting the book
 */
router.delete('/:id', controller.delete);

module.exports = router;
