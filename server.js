const express  = require("express")
const connectDB = require("./config/db");

//connect to the database
connectDB()

const app = express()


//init middleware
app.use(express.json({extended:false}))

const PORT = process.env.PORT || 5000

//route listening
app.use("/api/user",require("./Routes/users"))
app.use("/api/auth",require("./Routes/auth"))
app.use("/api/contact",require("./Routes/contacts"))


app.listen(PORT,()=>{
    console.log(`server started on PORT ${PORT}`);
})