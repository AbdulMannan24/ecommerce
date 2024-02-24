const { User } = require('../models/User');

async function fetchUser(email) {
    let user = await User.findOne({email: email});
    if (user) {
        return user;
    } else {
        return null;
    }
}

module.exports = {
    fetchUser
}