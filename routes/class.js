const express = require("express");
const Class = require("../models/Class");
const fetchuser = require("../middleware/fetchuser");
const fileupload = require("express-fileupload");
const router = express.Router();
router.use(fileupload());

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
    if (req.files) {
      const { name, description, classLink } = req.body;
      let file = req.files.file;
      let classes = Class.create({
        name,
        description,
        classLink,
        thumbnail: file.name,
      });
      file.mv(
        "../deltainvesting/client/src/Images/upload/" + file.name,
        function (err, result) {
          if (err && classes) {
            res
              .status(500)
              .json({ success: false, error: "Failed to upload image" });
          } else {
            res.status(201).json({ success: true, classes });
          }
        }
      );
    }
    else{
      const { name, description, classLink } = req.body;
      let classes = Class.create({
        name,
        description,
        classLink,
        thumbnail: null,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "internal error" });
  }
});

router.delete("/class/:id", async (req, res) => {
  try {
    let classes = await Class.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, classes });
  } catch (error) {
    res.status(500).json({ success: false, error: "internal error" });
  }
});

module.exports = router;
