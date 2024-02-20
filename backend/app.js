const express = require('express');
const connectDB = require('./db');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

require('dotenv').config();
app.use(express.json());
app.use(cors());


app.listen(port, ()=>{
    console.log('server started: '+ port);
    connectDB();
});