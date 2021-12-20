const mongoose = require('mongoose');

const mongoConnect = () => {
    mongoose.connect(process.env.MONGO_URI, ()=>{
        console.log("Successfully Connected to MongoDB");
    });
};

module.exports = mongoConnect;