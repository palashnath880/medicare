import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    email: String,
    password: String,
});

const Admin = mongoose.models?.medicareAdmin || mongoose.model('medicareAdmin', Schema);

export default Admin;