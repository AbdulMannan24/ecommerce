const { Admin } = require('../models/Admin');

async function fetchAdmin(email) {
    let admin = await Admin.findOne({email: email});
    if (admin) {
        return admin;
    } else {
        return null;
    }
}

module.exports = {
    fetchAdmin
}