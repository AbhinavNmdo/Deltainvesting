const mongoose = require('mongoose');


const classSchema = mongoose.Schema({
    name: String,
    description: String,
    classLink: String,
    Date: {
        type: Date,
        default: Date.now
    },
    thumbnail: String
});

const Class = mongoose.model('class', classSchema);
module.exports = Class;