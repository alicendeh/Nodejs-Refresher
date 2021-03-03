const express = require('express')
const validator = require("express-validator");
const route = express.Router()


//get logged in user
route.get("/",(req,res)=>{
res.send("get logged in user")
})


//user sigin
route.post("/",(req,res)=>{
    res.send("signing in user")
    })

module.exports = route