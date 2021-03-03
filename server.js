const express = require("express");

const app = express()

const PORT = process.env.PORT || 5000

app.get("/",(req,res)=>{
    res.send("hello world")
})

app.use("/api/users",require("./Routes/users"))
app.use("/api/auth",require("./Routes/auth"))
app.use("/api/contacts",require("./Routes/contacts"))


app.listen(PORT,()=>{
    console.log(`server started on PORT ${PORT}`);
})
 

