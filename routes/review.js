const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const User = require('../models/User');
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

router.get('/reviewuser/:id', (req, res)=>{
  try {
    let id = req.params.id;
    console.log(id);
    let user = User.findById('id');
    res.json(user);
  } catch (error) {
    res.status(400).send("Internal Error")
  }
})

module.exports = router;