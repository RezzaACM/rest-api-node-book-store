const router = require('express').Router();
const authorsController = require('../controllers/authorController');

router.post('/authors', authorsController.author);

module.exports = router