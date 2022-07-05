//----------------------------------- ROUTES ------------------------------------//

const accountRouter = require("./routes/account.router");
const fileRouter = require("./routes/file.routes");
const loginRouter = require("./routes/login.routes");
const signupRouter = require("./routes/signup.routes");
const userRouter = require("./routes/user.routes");
const transactionRouter = require("./routes/transaction.routes");

//-------------------------------- MIDDLEWARE -----------------------------------//

const logFunc= require("./middleware/log.middleware");
const error= require("./middleware/error.middleware");

//----------------------------------- IMPORTS -----------------------------------//

require('dotenv').config()
const cookieParser = require("cookie-parser");
const express = require('express');
const mongoose = require("mongoose");

//--------------------------------- CONNECTION ----------------------------------//

const DB_HOST = process.env.DB_HOST || "mongodb://localhost:27017";
const DB_NAME = process.env.DB_NAME || "bank-data"

//----------------------------------- SERVER ------------------------------------//

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

mongoose
    .connect(`${DB_HOST}/${DB_NAME}`)
    .then( () => {
        console.log("Succesful connection");
    })
    .catch( (err) => {
        console.log("Error connecting to mongo: ", err);
    });

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested, Content-Type, Accept Authorization"
    )
      res.header(
        "Access-Control-Allow-Methods",
        "POST, PUT, PATCH, GET, DELETE"
      )})   

app.use(logFunc);
app.use("/account",accountRouter);
app.use("/file",fileRouter);
app.use("/signup",signupRouter);
app.use("/login",loginRouter);
app.use("/transaction", transactionRouter);
app.use("/user",userRouter);
app.use(error);


module.exports = app;