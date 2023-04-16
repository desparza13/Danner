const router = require('express').Router();

const authorsRoute = require('./authors')
const readersRoute = require('./readers')
const booksRoute = require('./books')
const reviewsRoute = require('./reviews')
const requestsRoute = require('./friendshipRequests')

router.use('/authors',authorsRoute);
router.use('/readers',readersRoute);
router.use('/books',booksRoute);
router.use('/reviews',reviewsRoute);
router.use('/requests',requestsRoute);

module.exports = router;