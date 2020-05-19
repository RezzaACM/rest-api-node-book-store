const Book = require('../models/book');
const {
    bookValidation
} = require('../helpers/validation');

// Handle show list data
exports.index = (req, res) => {
    Book.find().populate('author').exec((err, data) => {
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

// Handle show detail data
exports.detail = (req, res) => {
    Book.findById(req.params.id).populate('author').exec((err, data) => {
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


// Handle create data
exports.create = async (req, res) => {
    // run validate in here
    const {
        error
    } = bookValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // title already using
    const titleExist = await Book.findOne({
        title: req.body.title
    })
    if (titleExist) return res.status(400).send('Title already exists');

    const book = new Book({
        title: req.body.title,
        stock: req.body.stock,
        available: req.body.available,
        description: req.body.description,
        author: req.body.author,
        cover: req.file.path
    });

    try {
        const saveAuthor = await book.save();
        res.json({
            status_code: 201,
            status_message: 'Success create new Book',
            data: saveAuthor
        }, 201)
    } catch (err) {
        res.status(400).send(err)
    }
}


// Handele update
exports.update = async (req, res) => {
    // check id is exist
    Book.findById(req.params.id, async (err, data) => {
        if (err) return res.json({
            status_code: 404,
            status_message: "id not found!"
        }, 404);


        // title already using
        const titleExist = await Book.findOne({
            title: req.body.title
        })
        if (titleExist) return res.status(400).send('Title already exists');

        data.title = req.body.title ? req.body.title : data.title;
        data.stock = req.body.stock;
        data.available = req.body.available;
        data.description = req.body.description;

        try {
            data.save()
            res.json({
                status_code: 201,
                status_message: 'Succes Update New Data',
                data: data
            }, 201)
        } catch (error) {
            res.status(400).send(err)
        }
    })
}

// Handle delete
exports.delete = async (req, res) => {
    Book.remove({
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