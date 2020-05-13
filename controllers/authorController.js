const Author = require('../models/author');
const {
    authorValidation
} = require('../helpers/validation');

// Handle show list data
exports.index = (req, res) => {
    Author.get((err, data) => {
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

// Handle show list data by id
exports.detail = (req, res) => {
    Author.findById(req.params.id, (err, data) => {
        if (!data) return res.status(404).send({
            status_code: 404,
            status_message: "id not found!"
        })
        else
            res.json({
                status_code: 200,
                status_message: 'Detail retrieved successfully',
                data: data
            }, 200)
    })
}

// Handle create new data
exports.create = async (req, res) => {
    // run validate in here
    const {
        error
    } = authorValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // mail already using
    const mailExist = await Author.findOne({
        email: req.body.email
    })
    if (mailExist) return res.status(400).send('Email already exists');

    const author = new Author({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
    });

    try {
        const saveAuthor = await author.save();
        res.json({
            status_code: 201,
            status_message: 'Success create new author',
            data: saveAuthor
        }, 201)
    } catch (err) {
        res.status(400).send(err)
    }
}


// Handle update data
exports.update = async (req, res) => {
    // check id is exist
    Author.findById(req.params.id, async (err, data) => {
        if (err) return res.json({
            status_code: 404,
            status_message: "id not found!"
        }, 404);

        // mail already using
        const mailExist = await Author.findOne({
            email: req.body.email
        })
        if (mailExist) return res.status(400).send('Email already exists');

        data.name = req.body.name ? req.body.name : data.name;
        data.email = req.body.email;
        data.phone = req.body.phone;
        data.address = req.body.address;

        try {
            data.save()
            res.json({
                status_code: 201,
                status_message: 'Succes Update New Ninja',
                data: data
            }, 201)
        } catch (error) {
            res.status(400).send(err)
        }

    })
}

// handle delete
exports.delete = async (req, res) => {
    Author.remove({
        _id: req.params.id
    }, (err, data) => {
        if (err) return res.status(404).send({
            status_code: 404,
            status_message: 'Id not found!'
        })

        if (data['deletedCount'] === 0) {
            res.json({
                status_code: 404,
                status_message: 'Id not found!'
            }, 404)
        } else {
            res.json({
                status_code: 200,
                status_message: "Delete Success!",
                id: req.params.id
            }, 200)
        }
    })
}