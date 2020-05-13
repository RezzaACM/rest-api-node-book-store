const router = require('express').Router();
const authorsController = require('../controllers/authorController');
const bookController = require('../controllers/bookController');

// Author route
router.get('/authors', authorsController.index);
router.get('/author/:id', authorsController.detail);
router.delete('/author/:id', authorsController.delete);
router.post('/authors', authorsController.create);
router.post('/authors/:id', authorsController.update);

// Book route
router.get('/books', bookController.index);
router.get('/book/:id', bookController.detail);
router.post('/book', bookController.create);

module.exports = router