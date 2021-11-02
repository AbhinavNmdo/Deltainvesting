const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  firstname: {
    type: String,
    ref: 'user'
  },
  lastname: {
    type: String,
    ref: 'user'
  },
  review: String,
  date: {
    type: Date,
    default: Date.now
  },
  
});

const Review = mongoose.model('review', reviewSchema);
module.exports = Review;