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

const bookValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        stock: Joi.number(),
        available: Joi.boolean(),
        description: Joi.string().required(),
        author: Joi.string().required(),
        cover: Joi.string()
    })
    return schema.validate(data)
}

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        phone: Joi.string().min(4).required(),
        address: Joi.string().min(6).required()
    })
    return schema.validate(data)
}

const orderValidation = (data) => {
    const schema = Joi.object({
        member: Joi.string().required(),
        total: Joi.number().required(),
        order: Joi.string().required(),
        book: Joi.string().required(),
        quantity: Joi.number().required(),
        sub_total: Joi.number().required()
    })
    return schema.validate(data)
}

module.exports.authorValidation = authorValidation;
module.exports.bookValidation = bookValidation;
module.exports.registerValidation = registerValidation;
module.exports.orderValidation = orderValidation;