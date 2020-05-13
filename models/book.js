const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        default: 0
    },
    available: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: true,
        max: 100
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
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

const Book = module.exports = mongoose.model('Book', bookSchema);

module.exports.get = function (callback, limit) {
    Book.find(callback).limit(limit)
}