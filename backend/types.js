const zod = require('zod');

const signUpBody = {
    name: zod.string(),
    email: zod.string().email(),
    phone: zod.string(),
    password: zod.string().min(6)
}

const loginBody = {
    email: zod.string().email(),
    password: zod.string().min(6)
}

module.exports = {
    signUpBody,
    loginBody
}