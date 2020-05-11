const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Author', authorSchema);