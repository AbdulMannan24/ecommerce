const express = require('express');
const { userAuth } = require('../middlewares/userAuth');
const { Order } = require('../models/Order');
const { orderBody } = require('../types');
const router = express.Router();

// if Order Id is provided fetch only one, else return all the orders for the user
router.get('/:id?', userAuth, async (req, res) => {
    try {
        let orderId = req.params.id;
        let userId = req.userId;
        if (orderId) {
            let orderData = await Order.findOne({_id: orderId});
            if (orderData) {
                res.status(200).json(orderData);
                return;
            } else {
                res.status(400).json({message: 'Order not found'});
                return;
            }
        } else {
            let orders = await Order.find({user_id: userId});
            if (orders) {
                res.status(200).json(orders);
                return;
            } else {
                res.status(400).json({message: 'No orders found for the user'});
                return;
            }
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Api Call Failed"});
    }
});

router.post('/create', userAuth, async (req, res) => {
    try {
        let { success } = orderBody.safeParse(req.body);
        if (!success) {
            res.status(404).json({message:"Invalid Order Input"});
            return;
        } 
        let order = await Order.create({
            user_id: req.userId,
            cart_products,
            total,
            status: req.body.status,
            payment_id
        })
        if (order) {
            res.status(200).json({message: "Order Created successfully"});
        } else {
            res.status(400).json({message: "Failed to create Order"});
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Api Call Failed"}); 
    }
});


module.exports = router;