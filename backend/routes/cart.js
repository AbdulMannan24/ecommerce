const express = require('express');
const mongoose = require('mongoose');
const { User } = require('../models/User');
const { Product } = require('../models/Product');
const { userAuth } = require('../middlewares/userAuth');
const router = express.Router();

router.get('/', userAuth, async (req, res) => {
    try {
        let userId = req.userId;
        let userData = await User.findOne({_id: userId});
        let cart = [];
        if (userData) {
            cart = userData.cart;   
        } 
        res.json({cart});
    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"});
    }
});

router.post('/add/:productId', userAuth, async (req, res) => {
    try {
        let userId = req.userId;
        let productId = req.params.productId;
        let isValid = mongoose.Types.ObjectId.isValid(productId);
        if (!isValid) {
            res.status(400).json({ message: 'Invalid Product Id'});
            return;
        }
        let user = await User.findOneAndUpdate({_id: userId}, {$push: {cart: productId}});
        if (user) {
            res.status(200).json({message: "Product added to cart successfully"});
        } else {
            res.status(400).json({message: "failed to add product to cart"});
        }
    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"}); 
    }
});

router.delete('/remove/:productId', userAuth, async (req, res) => {
    try {
        let userId = req.userId;
        let productId = req.params.productId;
        let isValid = mongoose.Types.ObjectId.isValid(productId);
        if (!isValid) {
            res.status(400).json({ message: 'Invalid Product Id'});
            return;
        }
        let user = await User.findOne({_id: userId});
        if (!user) { return res.status(400).json({ message: 'User not found' }); }
        let cart = user.cart;
        let index = cart.indexOf(productId);
        cart.splice(index, 1);
        let updateCart = await User.findOneAndUpdate({_id: userId}, {cart: cart});
        if (updateCart) {
            res.status(200).json({message: "Product Removed successfully"});
        } else {
            res.status(400).json({message: "failed to remove product from cart"});
        }
    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"}); 
    }
});

// empty cart
router.delete('/removeAll', userAuth, async (req, res)=> {
    try {
        let userId = req.userId;
        let user = await User.findOne({_id: userId})
        if (user) {
            let cart = user.cart;
            const products = await User.findOneAndUpdate({_id: userId},{cart: []});
            res.status(200).json({message: "All products Removed from Cart successfully"});
        } else {
            res.status(400).json({message: "failed to Remove Products from cart"});
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
            // const products = await Product.find({ _id: { $in: cart } });
            // console.log(products);
            for (let i = 0; i < cart.length; i++) {
                let product = await Product.findOne({ _id: cart[i]});
                total += parseInt(product.price);
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