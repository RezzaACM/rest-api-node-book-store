const Author = require('../models/author');
const {
    authorValidation
} = require('../helpers/validation');

exports.index = (req, res) => {
    Author.get((err, data) => {
        try {
            res.json({
                status_code: 200,
                status_message: 'Success create new author',
                data: data
            }, 200)
        } catch (error) {
            res.status(400).send(err)
        }
    })
}


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