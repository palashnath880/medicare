const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        if (mongoose.connections[0].readyState) {
            console.log('Already connected to MongoDB');
            return;
        }

        await mongoose.connect(process.env.DB_URI, {});
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;