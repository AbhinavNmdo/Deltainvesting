const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "this$is$the$sec$string";
let success = false;

router.post("/signup", async (req, res) => {
  const {
    firstName,
    lastName,
    companyName,
    address,
    email,
    phone,
    password,
    cpassword,
  } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ success, errror: "This email is already exist" });
    } 
    else {
      if (cpassword !== password) {
        res.status(400).json({
            success,
            error: "Password and Confirm password doesnt match",
          });
      } else {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);
        user = User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          companyName: req.body.companyName,
          address: req.body.address,
          email: req.body.email,
          phone: req.body.phone,
          password: secPass,
        });


        const data_signup = {
          user: {
            id: user._id,
          },
        };

        const authtoken_signup = jwt.sign(data_signup, JWT_SECRET);
        res.json({ success: true, authtoken_signup });
      }
    }
  } catch (error) {
    res.status(500).json({ success, error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ success, error: "Email not exist" });
  } else {
    let pass = await bcrypt.compare(password, user.password);
    if (!pass) {
      res.status(400).json({ success, error: "Password Incorrect" });
    } else {
      let data_login = {
        user: {
          id: user._id,
        },
      };
      const authtoken_login = jwt.sign(data_login, JWT_SECRET);
      res.json({ success: true, authtoken_login });
    }
  }
});

router.get("/getuser", fetchuser, async (req, res) => {
  try {
    let userid = req.user.id;
    let user = await User.findById(userid).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).json({ success, error: "Internal Server Error" });
  }
});

module.exports = router;
