require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const session = require("express-session");
const passport = require("passport");

app.use(
  session({
    secret: "Our little secret",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", require(__dirname + "/users/userController"));

module.exports = app;
