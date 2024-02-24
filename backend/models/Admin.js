const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
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
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
})

const Admin = mongoose.model('Admin', adminSchema);
module.exports = {
    Admin
}