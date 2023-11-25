import { connect } from "mongoose";

let cachedConnection = null;

const connectDB = async () => {
    try {

        if (cachedConnection) {
            console.log('Already connected to MongoDB');
            return;
        }

        const connection = await connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');

        cachedConnection = connection;

        return connection;
    } catch (err) {
        console.error(`MongoDB Connection Error`, err);
    }
}

module.exports = connectDB;