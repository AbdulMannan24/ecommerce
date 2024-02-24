const express = require('express');
const router = express.Router();

router.get('/', (req, res)=> {
    res.send("Api/v1");
})

const userRoutes = require('./user')
router.use('/user', userRoutes);

const adminRoutes = require('./admin');
router.use('/admin', adminRoutes);

const cartRoutes = require('./cart');
router.use('/cart', cartRoutes);

const orderRoutes = require('./order');
router.use('/order', orderRoutes);

const productRoutes = require('./product');
router.use('/product', productRoutes);

module.exports = router;