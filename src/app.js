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
const cors = require("cors");
const express = require('express');
const mongoose = require("mongoose");

//--------------------------------- CONNECTION ----------------------------------//

const DB_HOST = process.env.DB_HOST || "mongodb+srv://guitarrunner:89385774jdag@bankkonrad.tvbj9.mongodb.net/?retryWrites=true&w=majority";
const DB_NAME = process.env.DB_NAME || "bank-data"
const url = process.env.ORIGIN_URL || "http://localhost:3000"
//----------------------------------- SERVER ------------------------------------//

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', url);
    next();
  });
mongoose
    .connect(DB_HOST,{ useNewUrlParser: true, useUnifiedTopology: true },)
    .then( () => {
        console.log("Succesful connection");
    })
    .catch( (err) => {
        console.log("Error connecting to mongo: ", err);
    });

app.use(logFunc);
app.use("/account",accountRouter);
app.use("/file",fileRouter);
app.use("/signup",signupRouter);
app.use("/login",loginRouter);
app.use("/transaction", transactionRouter);
app.use("/user",userRouter);
app.use(error);


module.exports = app;