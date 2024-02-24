const express = require('express');
const router = express.Router();

router.get('/', (req, res)=> {
    res.send("Api/v1");
})

const userRoutes = require('./user')
router.use('/user', userRoutes);


module.exports = router;