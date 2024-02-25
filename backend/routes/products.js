const express = require('express');
const mongoose = require('mongoose');
const { Product } = require('../models/Product');
const { adminAuth } = require('../middlewares/adminAuth');
const { productBody } = require('../types');
const router = express.Router();

// get all or a specific product
router.get('/:id?', async (req, res) => {
    try {   
        let productId = req.params.id;
        if (productId) {
            let isValid = mongoose.Types.ObjectId.isValid(productId);
            if (!isValid) {
                res.status(400).json({ message: 'Invalid Product Id'});
                return;
            }
            let product = await Product.findOne({_id: productId});
            res.status(200).json({product});
            return;
        } 
        let products = await Product.find();
        res.status(200).json({products});        
    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Api Call Failed"});
    }
});

// search product by name, fetches all products which contain the name even as a substring
router.get('/search/:name', async (req, res) => {
    try {
        let productName = req.params.name;
        if (productName) {
            let products = await Product.find({ 
                name: { 
                    $regex: productName, 
                    $options: 'i' 
                } 
            });

            if (products.length > 0) {
                res.status(200).json({products});
            } else {
                res.status(200).json({message: 'No products found'});
            }
        } else {
            res.status(400).json({message: "Product Name invalid"});
        } 
    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Api Call Failed"});  
    }
});

// Add a product
router.post('/add', adminAuth, async (req, res) => {
    try {
        let { success } = productBody.safeParse(req.body);
        if (!success) {
            res.status(400).json({message: "Invalid Product Input"});
            return;
        }

        let {name, price, image, description, ratings, ratingsCount} = req.body;
        let addProduct = await Product.create({
            name,
            price,
            image,
            description,
            ratings,
            ratingsCount
        })

        if (addProduct) {
            res.status(200).json({message:"Product Added successfully"});
        } else {
            res.status(400).json({message: "Failed to Add Product"});
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Api Call Failed"}); 
    }
})

// update a product
router.put('/edit', adminAuth, async (req, res) => {
    try {
        let updatedBody = req.body;
        let productId = req.body.id;
        let isValid = mongoose.Types.ObjectId.isValid(productId);
        if (!isValid) {
            res.status(400).json({ message: 'Invalid Product Id'});
            return;
        }
        let updatedProduct = await Product.findOneAndUpdate({_id: productId}, {$set: updatedBody});
        if (updatedProduct) {
            res.status(200).json({message:"Product updated successfully"});
        } else {
            res.status(400).json({message: "Failed to update Product"});
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Api Call Failed"}); 
    }
});

// delete product
router.delete('/delete/:id', adminAuth, async (req, res) => {
    try {
        if (req.params.id) {
            let isValid = mongoose.Types.ObjectId.isValid(productId);
            if (!isValid) {
                res.status(400).json({ message: 'Invalid Product Id'});
                return;
            }
            let deletedProduct = await Product.findOneAndDelete({_id: req.params.id});
            if (deletedProduct) {
                res.status(200).json({message:"Product Deleted successfully"});
            } else {
                res.status(404).json({message: "Product Not Found"});
            }
        } else {
            res.status(404).json({message: "Product Id Invalid/Empty"});
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Invalid product Id/ Product not found"}); 
    }
});


module.exports = router;