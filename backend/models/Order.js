const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    cart_products: {
        type: [String],
        required: true,
    }, 
    total: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: "Delivered"
    },
    payment_id: {
        type: String,
        default: Math.random() * 10000
    }
}, {timestamps: true})

const Order = mongoose.model('Order', orderSchema);
module.exports = {
    Order
}