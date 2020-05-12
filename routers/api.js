const router = require('express').Router();
const authorsController = require('../controllers/authorController');

router.get('/authors', authorsController.index);
router.post('/authors', authorsController.create);

module.exports = router