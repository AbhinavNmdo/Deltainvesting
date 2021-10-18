const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    companyName: String,
    address: String,
    email: String,
    phone: Number,
    password: String
});

const User = mongoose.model('users', userSchema);
module.exports = User;