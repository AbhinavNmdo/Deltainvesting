const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const fetchuser = require('../middleware/fetchuser');

router.get('/review', async (req, res)=>{
  let review = await Review.find();
  res.json(review)
});

router.post('/postreview',fetchuser, (req, res)=>{
  try {
    let reviews = new Review({
      name: req.user.id,
      review: req.body.review
    })
    reviews.save();
    res.json(reviews);
  } catch (e) {
    res.status(500).send('Error')
  }
});

module.exports = router;