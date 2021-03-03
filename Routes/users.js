const express = require('express')
const validator = require("express-validator");
const route = express.Router()

route.get("/",(req,res)=>{
    res.send("hello")
})

//register users

route.post("/",(req,res)=>{
res.send("users registration")
})

module.exports = route