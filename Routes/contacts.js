const express = require("express");
const validator = require("express-validator");
const router = express.Router();
const Contact = require('../models/Contact')
const auth = require('../middleware/auth')
const {check,validationResult}  = require("express-validator")
//get all users contacts:PRIIVATE

router.get("/",auth, async(req, res) => {
  try {
    let contact = await Contact.find().sort({date:-1})
    res.json({contact})
  } catch (err) {
    console.error(err.message);
    
  }
});

//adding contacts:PRIVATE

router.post("/",auth,async(req, res) => {

    const {name,email,tel,type} = req.body

    try {
     let contact =  new Contact({user:req.user.id,name,email,tel,type});
     await contact.save()
     res.json({contact})
     console.log(contact);
      
    } catch (err) {
      console.error(err.message);
    }
});

//update contact:PRIVATE

router.put("/:id", (req, res) => {
  res.send("update contact");
});

//delete contact:PRIVATE

router.delete("/:id", (req, res) => {
  res.send("delete contact");
});

module.exports = router;
