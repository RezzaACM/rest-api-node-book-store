const Author = require('../models/author');
const {
    authorValidation
} = require('../helpers/validation');

exports.author = async (req, res) => {

    // run validate in here
    const {
        error
    } = authorValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

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