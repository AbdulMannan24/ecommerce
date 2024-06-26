const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { fetchAdmin } = require('../controllers/fetchAdmin');
const { Admin } = require('../models/Admin');
const { adminAuth } = require('../middlewares/adminAuth');
const { User } = require('../models/User');
const {signUpBody, loginBody} = require('../types');
const router = express.Router();

router.post('/signUp', async (req, res) => {
    try {
        const {success} = signUpBody.safeParse(req.body);
        if (!success) {
            res.status(404).json({message:"Invalid Details"});
            return;
        }

        // checking for existing user
        let userExists = await fetchAdmin(req.body.email);
        if (userExists) {
            res.status(404).json({message:"Admin already exists"});
            return;
        }

        let { name, email, phone, password } = req.body;
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);

        let createdUser = await Admin.create({
            name,
            email,
            phone,
            password: hash
        })

        if (createdUser) {
            let userId = createdUser._id.toString();
            let token = jwt.sign({
                userId: userId,
                isAdmin: true
            }, process.env.SECRET_KEY);

            res.status(200).json({
                message: "Admin created successfully",
                token: token
            });
        } else {
            console.log(createdUser);
            res.status(500).json({message:"failed to create Admin"});
        }
    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"});
    }
});


router.post('/signin', async (req, res) => {
    try {
        let {success} = loginBody.safeParse(req.body);
        if (!success) {
            res.json({message: "Invalid Credentials"});
            return;
        }

        let userExists = await fetchAdmin(req.body.email);
        if (!userExists) {
            res.json({message: "Admin does not exist"});
            return;
        }

        const checkPassword = await bcrypt.compare(req.body.password, userExists.password);
        if (checkPassword) {
            let token = jwt.sign({
                userId: userExists._id,
                isAdmin: true
            }, process.env.SECRET_KEY);
            return res.status(200).json({
                message: "success",
                token: token
            })
        } else {
            return res.json({
                message: "Password is incorrect"
            })
        }        

    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"}); 
    }
});


router.put('/edit', adminAuth, async (req, res) => {
    try {
        let edited = false;
        let userId = req.userId;
        if (req.body.name) {
            await Admin.updateOne({_id: userId}, {name: req.body.name});
            edited = true;
        }

        if (req.body.phone) {
            await Admin.updateOne({_id: userId}, {phone: req.body.phone});
            edited = true;
        }

        if (req.body.password) {
            let password = req.body.password;
            if (password.length >= 6) {
                let salt = await bcrypt.genSalt(10);
                let hash = await bcrypt.hash(password, salt);
                await Admin.updateOne({_id: userId}, {password: hash});
                edited = true;
            } else {
                res.json({message:"The password must be at least 6 characters"});
                return;
            }
        }

        if (edited) {
            res.status(200).json({message:"Profile updated successfuly"});
        } else {
            res.status(500).json({message:"failed to update user"});
        } 
    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"}); 
    }
});

// fetching all users, excluding user passwords
router.get('/allusers', adminAuth, async (req, res) => {
    try {
        let users = await User.find().select('-password');
        if (users.length > 0) {
            res.json({users});
        } else {
            res.json({message: "No Users found"});
        }
    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"}); 
    }
});

router.delete('/deleteUser/:id?', adminAuth, async (req, res) => {
    try {
        let user = req.params.id;
        user = new mongoose.Types.ObjectId(user);
        if (user) {
            let isValid = mongoose.Types.ObjectId.isValid(user);
            if (!isValid) {
                res.json({ message: 'Invalid User Id'});
                return;
            }
            let {deletedCount} = await User.deleteOne({_id: user});

            if (deletedCount) {
                res.json({message: "User deleted successfully"});
                return;
            } else {
                res.status(500).json({message: "failed to delete user"});
                return;
            }
        }
        res.json({message: "Provide a valid User ID"});
    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"}); 
    }
});

module.exports = router;