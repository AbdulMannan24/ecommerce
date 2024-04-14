const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const zod = require('zod');
const { signUpBody, loginBody } = require('../types');
const { User } = require('../models/User');
const { fetchUser } = require('../controllers/fetchUser');
const { userAuth } = require('../middlewares/userAuth');

router.get('/me', userAuth, async (req, res) => {
    try {
        let user = await User.findOne({_id : req.userId}).select('-password');
        if (user) {
            res.status(200).json({user});
            return;
        } else {
            res.json({message:"failed to fetch user"});
        }
    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"}); 
    }
});

router.post('/signUp', async (req, res) => {
    try {
        const {success} = signUpBody.safeParse(req.body);
        if (!success) {
            res.json({message:"Invalid Details"});
            return;
        }

        // checking for existing user
        let userExists = await fetchUser(req.body.email);
        if (userExists) {
            res.json({message:"User already exists"});
            return;
        }

        let { name, email, phone, password } = req.body;
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);

        let createdUser = await User.create({
            name,
            email,
            phone,
            password: hash
        })

        if (createdUser) {
            let userId = createdUser._id.toString();
            let token = jwt.sign({
                userId: userId
            }, process.env.SECRET_KEY);

            res.status(200).json({
                message: "success",
                token: token
            });
        } else {
            console.log(createdUser);
            res.json({message:"failed to create user"});
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

        let userExists = await fetchUser(req.body.email);
        if (!userExists) {
            res.json({message: "User does not exist"});
            return;
        }

        const checkPassword = await bcrypt.compare(req.body.password, userExists.password);
        if (checkPassword) {
            let token = jwt.sign({
                userId: userExists._id,
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

router.put('/edit', userAuth, async (req, res) => {
    try {
        let edited = false;
        let userId = req.userId;
        if (req.body.name) {
            await User.updateOne({_id: userId}, {name: req.body.name});
            edited = true;
        }

        if (req.body.phone) {
            await User.updateOne({_id: userId}, {phone: req.body.phone});
            edited = true;
        }

        if (req.body.password) {
            let password = req.body.password;
            if (password.length >= 6) {
                let salt = await bcrypt.genSalt(10);
                let hash = await bcrypt.hash(password, salt);
                await User.updateOne({_id: userId}, {password: hash});
                edited = true;
            } else {
                res.json({message:"The password must be at least 6 characters"});
                return;
            }
        }

        if (edited) {
            res.status(200).json({message:"Profile updated successfuly"});
        } else {
            res.json({message:"failed to update user"});
        }
    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"});
    }
});

router.delete('/delete', userAuth, async (req, res) => {
    try {
        let userId = req.userId;
        let {deletedCount} = await User.deleteOne({_id: userId});
        if (deletedCount) {
            res.status(200).json({message:"User deleted successfully"});
        } else {
            res.json({message: "failed to delete user"});
        }
    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"});
    }
});

module.exports = router;