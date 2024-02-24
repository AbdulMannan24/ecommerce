const express = require('express');
const { User } = require('../models/User');
const { Product } = require('../models/Product');
const router = express.Router();

router.get('/', userAuth, async (req, res) => {
    try {
        let userId = req.userId;
        let userData = await User.findOne({_id: userId});
        const cart = [];
        if (userData) {
            cart = userData.cart;   
        } 
        res.json(cart);
    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"});
    }
});

router.post('/add/:productId', userAuth, async (req, res) => {
    try {
        let userId = req.userId;
        let productId = req.params.productId;
        let user = await User.findOneAndUpdate({_id: userId}, {$push: {cart: productId}});
        if (user) {
            res.status(200).json({message: "Product added successfully"});
        } else {
            res.status(400).json({message: "failed to add product to cart"});
        }
    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"}); 
    }
});

router.post('/remove/:productId', userAuth, async (req, res) => {
    try {
        let userId = req.userId;
        let productId = req.params.productId;
        let user = await User.findOneAndUpdate({_id: userId}, {$pull: {cart: productId}});
        if (user) {
            res.status(200).json({message: "Product Removed successfully"});
        } else {
            res.status(400).json({message: "failed to remove product from cart"});
        }
    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"}); 
    }
});

router.get('/total', userAuth, async (req, res)=> {
    try {
        let userId = req.userId;
        let user = await User.findOne({_id: userId})
        if (user) {
            let cart = user.cart;
            let total = 0;
            const products = await Product.find({ _id: { $in: cart } });
            for (let i = 0; i < products.length; i++) {
                total += products[i].price;
            }
            res.status(200).json({cartTotal : total});
        } else {
            res.status(400).json({message: "failed to calculate cart total"});
        } 
    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"});  
    }
});

module.exports = router;