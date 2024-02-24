const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    cart : {
        type: [String],
        default: []
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema);
module.exports = {
    User
}