const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");

router.get("/", async (req, res) => {
  try {
    let review = await Review.find().sort({date: -1});
    res.status(200).json({success: true, review});
  } catch (error) {
    res.status(500).json({success: false, error: "internal error"})
  }
});

router.post("/", fetchuser, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    let reviews = new Review({
      firstname: user.firstName,
      lastname: user.lastName,
      review: req.body.review,
    });
    reviews.save();
    res.status(201).json({success: true, reviews});
  } catch (e) {
    res.status(500).json({success: false, error: "internal error"});
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    let review = await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({success: true, review});
  } catch (error) {
    res.status(500).json({success: false, error: "internal error"})
  }
});

module.exports = router;
