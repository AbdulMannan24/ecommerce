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
        default: null
    },
    status: {
        type: String,
        default: null
    },
    payment_id: {
        type: String,
        default: null
    }
}, {timestamps: true})

const Order = mongoose.model('Order', orderSchema);
module.exports = {
    Order
}