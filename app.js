//importing all the libraries required
const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");

//create app from express
const app = express();

//setting up cors
// app.use(cors());

app.use(session({ resave: false, saveUninitialized: true, secret: "SECRET" }));

//morgan middleware
app.use(morgan("tiny"));

//regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//temp view engine
app.set("view engine", "ejs");

app.use(cookieParser());

//import all routes
const home = require("./routes/home");
const user = require("./routes/user");

//router middlewares
app.use("/api/v1", home);
app.use("/api/v1", user);

//passport middlwares
app.use(passport.initialize());
app.use(passport.session());

//exporting app into index.js
module.exports = app;
