const express = require("express");
const validator = require("express-validator");
const router = express.Router();

//get all users contacts:PRIIVATE

router.get("/", (req, res) => {
  res.send("get all contacts");
});

//adding contacts:PRIVATE

router.post("/", (req, res) => {
  res.send("add contact");
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
