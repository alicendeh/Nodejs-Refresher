const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken")
const config = require("config")

router.post(
  "/",

  [
    check("name", "enter name na").not().isEmpty(),
    check("email", "enterr ther mail sha").isEmail(),
    check("password", "enter password +4").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "uuser already exists sha" });
      }
      user = new User({ name, email, password });

      const salt = await bcrypt.genSalt(15);

      user.password = await bcrypt.hash(password, salt);

      await user.save()
      const payLoad = {
          user:{
              id:user.id
          }
      }
      jwt.sign(payLoad,config.get('secret'),{
          expiresIn:360000
      },(err,token)=>{
          if (err){
            throw err;
          }
          res.json({token:token})
      })
    } catch (error) {
        console.error("oops server error");
    }
  }
);

module.exports = router;
