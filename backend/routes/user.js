const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("This is working scenario");
});

router.post('/signUp', async (req, res) => {
    try {
        
    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"});
    }
});


router.post('/login', (req, res) => {

});

router.post('/edit', (req, res) => {

});



module.exports = router;