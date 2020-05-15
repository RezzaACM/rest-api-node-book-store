const Member = require('../models/member');
const bcrypt = require('bcryptjs');

const {
    registerValidation
} = require('../helpers/validation');

// Handle show list data
exports.index = (req, res) => {
    Member.find()
        .select("_id name email password phone address profile")
        .exec()
        .then(docs => {
            const response = {
                status_code: 200,
                status_message: "Data retrived Successfully",
                count: docs.length,
                member: docs.map(doc => {
                    return {
                        name: doc.name,
                        email: doc.email,
                        password: doc.password,
                        phone: doc.phone,
                        address: doc.address,
                        profile: doc.profile,
                        _id: doc._id
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

}

// Handle create new data
exports.create = async (req, res) => {
    console.log(req.file)
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
        profile: req.file.path
    })

    try {
        const saveMember = await member.save()
        res.json({
            status_code: 201,
            status_message: 'Success create new author',
            data: saveMember,
            profile_url: `http://localhost:3000/uploads/${req.file.filename}`
        }, 201)
    } catch (error) {
        res.status(400).send(err)
    }
}