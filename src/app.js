//----------------------------------- ROUTES ------------------------------------//

const loginRouter = require("./routes/login.routes");
const signupRouter = require("./routes/signup.routes");

//-------------------------------- MIDDLEWARE -----------------------------------//

const logFunc= require("./middleware/log.middleware")
const error= require("./middleware/error.middleware")

//----------------------------------- IMPORTS -----------------------------------//

require('dotenv').config()
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require('express');
const mongoose = require("mongoose");

//--------------------------------- CONNECTION ----------------------------------//

const DB_HOST = process.env.DB_HOST || "mongodb://localhost:27017";
const DB_NAME = process.env.DB_NAME || "bank-data"

//----------------------------------- SERVER ------------------------------------//

const app = express();
app.use(cors({credentials: true, origin: 'http://localhost:3001'}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

mongoose
    .connect(`${DB_HOST}/${DB_NAME}`)
    .then( () => {
        console.log("Succesful connection")
    })
    .catch( (err) => {
        console.log("Error connecting to mongo: ", err)
    })

app.use(logFunc)
app.use("/signup",signupRouter)
app.use("/login",loginRouter)
app.use(error)


module.exports = app;