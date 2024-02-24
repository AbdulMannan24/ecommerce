const Admin = require('../models/Admin');

async function fetchAdmin(email) {
    let admin = await User.findOne({email: req.body.email});
    if (admin) {
        return admin;
    } else {
        return null;
    }
}

module.exports = {
    fetchAdmin
}