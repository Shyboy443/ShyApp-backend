const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const userRoute = require("./routes/UserRoute")
const productRoute = require("./routes/productRoute")
const contactRoute = require("./routes/contactRoute")
const errorHandler = require("./middleware/errorMiddleware")
const cookieParser = require("cookie-parser")
const path = require("path")

const app = express()
const PORT = process.env.PORT || 2000;

const FRONTEND_URL = process.env.FRONTEND_URL;




//Middlewares

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(cors({
    origin: ["http://localhost:3000",`${FRONTEND_URL}`],
    credentials: true,
}));
app.use("/uploads",express.static(path.join(__dirname,"uploads")));

// Route Middleware

app.use("/api/users",userRoute)
app.use("/api/products",productRoute)
app.use("/api/contactus",contactRoute)



//Routes

app.get("/",(req,res)=> {
    res.send("Home Page");
});

//Error Middleware
app.use(errorHandler);

//Connect to DB and start Server
mongoose
        .connect(process.env.MONGO_URI)
        .then(() =>{

            app.listen(PORT,()=>{
                console.log("MONGO DB CONNECTED")
                console.log(`Server Running on Port ${PORT}`);

            })


        })
        .catch((err) => console.log(err))