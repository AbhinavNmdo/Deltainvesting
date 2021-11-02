const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const User = require('../models/User');
const fetchuser = require('../middleware/fetchuser');

router.get('/review', async (req, res)=>{
  let review = await Review.find();
  res.json(review)
});

router.post('/postreview',fetchuser, async (req, res)=>{
  let user = await User.findById(req.user.id);
  console.log(user);
  try {
    let reviews = new Review({
      firstname: user.firstName,
      lastname: user.lastName,
      review: req.body.review
    })
    reviews.save();
    res.json(reviews);
  } catch (e) {
    res.status(500).send('Error')
  }
});

router.get('/reviewuser/:id', async (req, res)=>{
    let id = req.params.id;
    console.log(id);
    let user = await User.findById(id).select("-password")
    res.json(user);
  
})

module.exports = router;