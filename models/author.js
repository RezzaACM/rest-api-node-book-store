const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        max: 30
    },
    phone: {
        type: String,
        required: true,
        max: 20
    },
    address: {
        type: String,
        required: true,
        max: 100
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }

});

const Author = module.exports = mongoose.model('Author', authorSchema);

module.exports.get = function (callback, limit) {
    Author.find(callback).limit(limit)
}