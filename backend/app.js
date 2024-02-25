const express = require('express');
const connectDB = require('./db');
const app = express();
const cors = require('cors');
const { countRequests } = require('./middlewares/countRequests');
const port = process.env.PORT || 3000;

// middlewares
require('dotenv').config();
app.use(express.json());
app.use(cors());
app.use(countRequests);

const mainRouter = require('./routes/index');
app.use('/api/v1/', mainRouter);

app.get('/', (req, res) => {
    res.send("please use /api/v1/ for all routes");
});
app.listen(port, ()=>{
    console.log('server started: '+ port);
    connectDB();
});