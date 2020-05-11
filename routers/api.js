const router = require('express').Router();
const authorsController = require('../controllers/authorController');

router.get('/authors', authorsController.author);

module.exports = router