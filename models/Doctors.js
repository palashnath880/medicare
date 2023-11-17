const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: String,
    email: String,
    degree: String,
    currentEmployeeOf: String,
    image: String,
    specialist: String,
    visitPrice: Number,
    visitTimes: [String]
});

const Doctor = mongoose.model('doctors', Schema);

module.exports = Doctor;