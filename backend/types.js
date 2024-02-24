const zod = require('zod');

const signUpBody = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    phone: zod.string(),
    password: zod.string().min(6)
})

const loginBody = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
})

const orderBody = zod.object({
    cart_products : zod.array(zod.string()),
    total: zod.number(),
    status: zod.string(),
    payment_id: zod.string()
})

const productBody = zod.object({
    name: zod.string(),
    price: zod.number()
})

module.exports = {
    signUpBody,
    loginBody,
    orderBody,
    productBody
}