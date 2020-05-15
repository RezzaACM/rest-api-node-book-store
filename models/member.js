const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        max: 30
    },
    password: {
        type: String,
        required: true,
        max: 256
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
    avatar: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

const Member = module.exports = mongoose.model('Member', memberSchema);

module.exports.get = function (callback, limit) {
    Member.find(callback).limit(limit)
}