const express = require("express");
const Class = require("../models/Class");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let classes = await Class.find();
    res.status(200).json({ success: true, classes });
  } catch (error) {
    res.status(500).json({ success: false, error: "internal error" });
  }
});

router.get("/class/:id", async (req, res) => {
  try {
    const classes = await Class.findById(req.params.id);
    res.status(200).json({ success: true, classes });
  } catch (error) {}
});

router.post("/", (req, res) => {
  try {
    const { name, description, classLink, thumbnail } = req.body;
    let classes = Class.create({
      name,
      description,
      classLink,
      thumbnail,
    });
    res.status(201).json({success: true, classes});
  } catch (error) {
    res.status(500).json({success: false, error: "internal error" });
  }
});

router.delete('/class/:id', async (req, res)=>{
    try {
        let classes = await Class.findByIdAndDelete(req.params.id);
        res.status(200).json({success: true, classes});
    } catch (error) {
        res.status(500).json({success: false, error: "internal error"})
    }
})

module.exports = router;
