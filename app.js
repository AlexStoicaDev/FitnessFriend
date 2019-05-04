require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
mongoose
  .connect("mongodb://localhost:27017/fitnessFriendDB", {
    useNewUrlParser: true
  })
  .then(() => console.log("Connected to DB..."))
  .catch(err => console.log(err));

app.get("/test", function(req, res) {
  console.log("merge");
});

app.listen(3000, () => console.log("Server is running..."));
module.exports = app;
