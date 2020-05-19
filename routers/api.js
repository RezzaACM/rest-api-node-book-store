const router = require('express').Router();
const authorsController = require('../controllers/authorController');
const bookController = require('../controllers/bookController');
const memberController = require('../controllers/memberController');
const orderController = require('../controllers/orderController');

// Multer
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})


const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


// Author route
router.get('/authors', authorsController.index);
router.get('/author/:id', authorsController.detail);
router.delete('/author/delete/:id', authorsController.delete);
router.post('/author/create', authorsController.create);
router.post('/author/update/:id', authorsController.update);

// Book route
router.get('/books', bookController.index);
router.get('/book/:id', bookController.detail);
router.post('/book/create', upload.single('cover'), bookController.create);
router.post('/book/update/:id', bookController.update);
router.delete('/book/delete/:id', bookController.delete);

// Member route
router.get('/members', memberController.index);
router.post('/member/register', upload.single('profile'), memberController.create);


// Create Order
router.post('/order', orderController.create)

module.exports = router