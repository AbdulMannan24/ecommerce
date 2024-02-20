const mongoose = require('mongoose');

const connectDB = async ()=> {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB Connected");
    } catch (err) {
        console.log(err);
        console.log("Failed to Connect DB");
        return;
    }
}

module.exports = connectDB;