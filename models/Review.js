const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.ObjectId,
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