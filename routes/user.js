const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "this$is$the$sec$string";

// const host = "http://localhost:3000"
const host = "https://deltainvesting.herokuapp.com";

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODE_MAIL,
    pass: process.env.NODE_MAILPASS,
  },
});

router.post("/auth/signup", async (req, res) => {
  const { firstName, lastName, address, email, phone, password, cpassword } =
    req.body;
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
      res.status(500).json({ success: false, error: "internal error" });
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

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      let secret = process.env.JWT_SECRET + user.password;
      let payload = {
        email: user.email,
        id: user._id,
      };
      const token = jwt.sign(payload, secret, { expiresIn: "10m" });
      const link = `${host}/reset-password/${user._id}/${token}`;
      const output = `<h1 align="center">Hello ${user.firstName} ${user.lastName}!</h1>
      <h2 align="center">DeltaInvesting Academy</h2>
      <br>
      <br>
      <h3 align="center">Hello ${user.firstName} here is the link for reset link your account, remember this link is valid for only 10 minutes</h3>
      <br>
      <div style="display: flex; justify-content: center; align-items: center; min-height: 5vh">
      <button align="center" style="padding: 7px; border-radius: 15px; background-color: blue; color: white; border: 1px solid blue"><a href=${link} style="text-decoration: none; color: white">Reset Password</a></button>
      </div>`;

      const mailOption = {
        from: process.env.NODE_MAIL,
        to: user.email,
        subject: `Hello ${user.firstName} ${user.lastName}!, from DeltaInvesting Academy`,
        html: output,
      };
      transport.sendMail(mailOption, function (error, info) {
        if(error){
          console.log(error);
        }
        else{
          console.log("Email Sent: " + info)
        }
      })
      res.status(200).json({ success: true, link });
    } else {
      res.status(500).json({ success: false, error: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "internal error" });
  }
});

router.post("/reset-password", async (req, res) => {
  const { password, cpassword } = req.body;
  const { id, token } = req.headers;
  try {
    const user = await User.findById(id);
    let secret = process.env.JWT_SECRET + user.password;
    if (user) {
      const payload = jwt.verify(token, secret);
      if (payload) {
        if (password === cpassword) {
          let salt = await bcrypt.genSalt(10);
          let secPass = await bcrypt.hash(password, salt);
          const filter = { _id: user._id };
          const up = { password: secPass };
          const update = await User.findOneAndUpdate(filter, up);
          if (update) {
            res.status(200).json({ success: true, update });
          }
        } else {
          res.status(500).json({ success: false, error: "pass not match" });
        }
      } else {
        res.status(500).json({ success: false, error: "error in payload" });
      }
    } else {
      res.status(500).json({ success: false, error: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "internal error" });
  }
});

router.get("/reset-password/authentication", async (req, res) => {
  try {
    const { id, token } = req.headers;
    const user = await User.findById(id);

    let secret = process.env.JWT_SECRET + user.password;

    if (user) {
      const payload = jwt.verify(token, secret);
      if (payload.id == id) {
        res.status(200).json({ success: true });
      } else {
        res.status(500).json({ success: false, error: "error in payload" });
      }
    } else {
      res.status(500).json({ success: false, error: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "internal error" });
  }
});

module.exports = router;
