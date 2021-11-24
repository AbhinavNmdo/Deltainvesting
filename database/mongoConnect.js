const mongoose = require('mongoose');

const mongoConnect = () => {
    mongoose.connect(process.env.MONGO_URI, ()=>{
        console.log("Successfully Connected to MongoDB");
    });
    console.log(process.env.MONGO_URI)
    console.log(process.env.NODE_ENV)
    console.log(process.env.PORT)
};

module.exports = mongoConnect;