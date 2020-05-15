const Member = require('../models/member');
const bcrypt = require('bcryptjs');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

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

const {
    registerValidation
} = require('../helpers/validation');

// Handle show list data
exports.index = (req, res) => {
    Member.get((err, data) => {
        try {
            res.json({
                status_code: 200,
                status_message: 'Data retrieved successfully',
                data: data
            }, 200)
        } catch (error) {
            res.status(400).send(err)
        }
    })
}

// Handle create new data
exports.create = async (req, res) => {
    // run validate in here
    const {
        error
    } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // mail already using
    const mailExist = await Member.findOne({
        email: req.body.email
    })
    if (mailExist) return res.status(400).send('Email already exists');

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const member = new Member({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        phone: req.body.phone,
        address: req.body.address,
        avatar: req.file.path
    })

    try {
        const saveMember = await member.save()
        res.json({
            status_code: 201,
            status_message: 'Success create new author',
            data: saveMember
        }, 201)
    } catch (error) {
        res.status(400).send(err)
    }
}