const Joi = require('@hapi/joi');

const authorValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        phone: Joi.string().min(4).required(),
        address: Joi.string().min(6).required()
    })
    return schema.validate(data)
}

module.exports.authorValidation = authorValidation;