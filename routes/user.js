const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "this$is$the$sec$string";

router.post("/auth/signup", async (req, res) => {
  const {
    firstName,
    lastName,
    address,
    email,
    phone,
    password,
    cpassword,
  } = req.body;
  if (
    !firstName &&
    !lastName &&
    !address &&
    !email &&
    !phone &&
    !password &&
    !cpassword
  ) {
    res.status(400).json({ success: false, error: "no content" });
  } else {
    try {
      let user = await User.findOne({ email });
      if (user) {
        res.status(401).json({ success: false, error: "email already exist" });
      } else {
        if (cpassword !== password) {
          res
            .status(400)
            .json({ success: false, error: "password doesnt match" });
        } else {
          const salt = await bcrypt.genSalt(10);
          const secPass = await bcrypt.hash(password, salt);
          user = User.create({
            firstName,
            lastName,
            address,
            email,
            phone,
            password: secPass,
          });

          const data_signup = {
            user: {
              id: user._id,
            },
          };

          const authtoken_signup = jwt.sign(data_signup, JWT_SECRET);
          res.status(201).json({ success: true, authtoken_signup });
        }
      }
    } catch (error) {
      res.status(500).json({ success: false, error: "internal error" });
    }
  }
});

router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    res.status(400).json({ success: false, error: "no content" });
  } else {
    try {
      let user = await User.findOne({ email });
      if (!user) {
        res.status(401).json({ success: false, error: "invalid email" });
      } else {
        let pass = await bcrypt.compare(password, user.password);
        if (!pass) {
          res.status(401).json({ success: false, error: "invalid password" });
        } else {
          let data_login = {
            user: {
              id: user._id,
            },
          };
          const authtoken_login = jwt.sign(data_login, JWT_SECRET);
          res.status(202).json({ success: true, authtoken_login });
        }
      }
    } catch (error) {
      res.status(500).json({success: false, error: "internal error"});
    }
  }
});

router.get("/getuser", fetchuser, async (req, res) => {
  try {
    let userid = req.user.id;
    let user = await User.findById(userid).select("-password");
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success, error: "internal error" });
  }
});

router.get("/", async (req, res) => {
  try {
    let user = await User.find().select("-password");
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: "internal error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: "internal error" });
  }
});

module.exports = router;
