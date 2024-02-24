const express = require('express');
const connectDB = require('./db');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

// middlewares
require('dotenv').config();
app.use(express.json());
app.use(cors());

const mainRouter = require('./routes/index');
app.use('/api/v1/', mainRouter);

app.listen(port, ()=>{
    console.log('server started: '+ port);
    connectDB();
});