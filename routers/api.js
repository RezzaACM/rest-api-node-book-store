const router = require('express').Router();
const authorsController = require('../controllers/authorController');
const bookController = require('../controllers/bookController');

// Author route
router.get('/authors', authorsController.index);
router.get('/author/:id', authorsController.detail);
router.delete('/author/delete/:id', authorsController.delete);
router.post('/author/create', authorsController.create);
router.post('/author/update/:id', authorsController.update);

// Book route
router.get('/books', bookController.index);
router.get('/book/:id', bookController.detail);
router.post('/book/create', bookController.create);
router.post('/book/update/:id', bookController.update);
router.delete('/book/delete/:id', bookController.delete);

module.exports = router