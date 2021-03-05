const express = require("express");
const validator = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator/check");
const User = require("../models/User");
const config = require("config");
const auth = require("../middleware/auth");

//get logged in user
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user)
  } catch (error) {
    console.error(error.message);
  }
});

//user sigin
router.post(
  "/",
  [
    check("email", "email must not be empty").isEmail(),
    check("password", "4+ characters").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send("No such user with mail found");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send("No such user pwd found");
      }
      const payLoad = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payLoad,
        config.get("secret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token: token });
        }
      );
    } catch (error) {
      console.error("oops server error");
    }
  }
);

module.exports = router;
