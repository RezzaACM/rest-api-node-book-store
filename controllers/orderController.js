const mongoose = require("mongoose");
const Order = require('../models/order');
const OrderDetail = require('../models/order_detail');
const {
    orderValidation
} = require('../helpers/validation');

exports.create = (req, res) => {

    // run validate in here
    const {
        error
    } = orderValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        member: req.body.member,
        order_status: req.body.order_status,
        total: req.body.total
    })

    let object = []
    const transaction_detail = req.body.transaction_detail;
    for (let i = 0; i < transaction_detail.length; i++) {
        const orderDetail = new OrderDetail({
            order: order['_id'],
            book: transaction_detail[i].book,
            quantity: transaction_detail[i].quantity,
            sub_total: transaction_detail[i].quantity,
        })
        orderDetail.save()
        object.push(orderDetail)
    }

    try {
        order.save()
        res.json({
            status_code: 201,
            status_message: 'Success Create new Order!',
            data: {
                order: order,
                order_detail: object
            }
        }, 201)
    } catch (err) {
        res.status(400).send(err)
    }
}