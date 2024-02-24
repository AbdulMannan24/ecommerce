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

const orderBody = {
    cart_products : zod.array(zod.string()),
    total: zod.number(),
    status: zod.string(),
    payment_id: zod.string()
}

module.exports = {
    signUpBody,
    loginBody,
    orderBody
}