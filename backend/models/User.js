const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    companyName: String,
    address: String,
    email: String,
    phone: Number,
    password: String,
    gender:String
});

const User = mongoose.model('users', userSchema);
module.exports = User;