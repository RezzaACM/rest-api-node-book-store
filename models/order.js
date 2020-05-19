const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    member: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    order_status: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
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

module.exports = mongoose.model('Order', orderSchema);