const express = require("express");
const validator = require("express-validator");
const route = express.Router();

//get all users contacts:PRIIVATE

route.get("/", (req, res) => {
  res.send("get all contacts");
});

//adding contacts:PRIVATE

route.post("/", (req, res) => {
  res.send("add contact");
});

//update contact:PRIVATE

route.put("/:id", (req, res) => {
  res.send("update contact");
});

//delete contact:PRIVATE

route.delete("/:id", (req, res) => {
  res.send("delete contact");
});

module.exports = route;
