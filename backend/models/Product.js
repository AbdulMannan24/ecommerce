const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true,
    }, 
    image: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: null
    },
    ratings: {
        type: Number,
        default: 0
    },
    ratingsCount: {
        type: Number,
        default: 0
    }
   
}, {timestamps: true})

const Product = mongoose.model('Product', productSchema);
module.exports = {
    Product
}