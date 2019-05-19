require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const ejs = require("ejs");
require(__dirname + "/diets/dietModel.js");
const Diet = mongoose.model("Diet");
require(__dirname + "/diets/dailyDietModel.js");
const DailyDiet = mongoose.model("DailyDiet");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", require(__dirname + "/users/userController"));
app.use("/api", require(__dirname + "/diets/dietController"));

app.route("/api").get(function(req, res) {
  let isAuthenticated = false;
  let hasDiet = false;

  if (req.user) {
    if (req.user.diets.length >= 1) {
      hasDiet = true;
    }
    isAuthenticated = true;
  }

  res.render("index", { isAuthenticated: isAuthenticated, hasDiet: hasDiet });
});
app.route("/api/program").get(function(req, res) {
  if (!req.isAuthenticated()) {
    res.status(401);
    res.send(process.env.NOT_AUTHENTICATED_TEXT);
  } else {
    Diet.findById(req.user.diets[req.user.diets.length - 1], function(
      err,
      foundDiet
    ) {
      let diets = [];

      foundDiet.dailyDiets.forEach(dietId => {
        DailyDiet.findById(dietId, function(err, foundDailyDiet) {
          let dietObject = {
            firstMeal: {
              imageUrl: foundDailyDiet.firstMeal.recipe.image,
              name: foundDailyDiet.firstMeal.recipe.label,
              ingredients: foundDailyDiet.firstMeal.recipe.ingredientLines,
              findOutMore: foundDailyDiet.firstMeal.recipe.url
            },
            secondMeal: {
              imageUrl: foundDailyDiet.secondMeal.recipe.image,
              name: foundDailyDiet.secondMeal.recipe.label,
              ingredients: foundDailyDiet.secondMeal.recipe.ingredientLines,
              findOutMore: foundDailyDiet.secondMeal.recipe.url
            },
            thirdMeal: {
              imageUrl: foundDailyDiet.thirdMeal.recipe.image,
              name: foundDailyDiet.thirdMeal.recipe.label,
              ingredients: foundDailyDiet.thirdMeal.recipe.ingredientLines,
              findOutMore: foundDailyDiet.thirdMeal.recipe.url
            }
          };
          diets.push(dietObject);
          if (diets.length === foundDiet.dailyDiets.length) {
            res.render("program", { dailyDiets: diets });
          }
        });
      });
    });
  }
});
app.route("/api/loginPage").get(function(req, res) {
  res.render("login");
});
app.route("/api/logout").get(function(req, res) {
  req.logout();
  res.redirect("/api");
});
app.route("/api/logout").get(function(req, res) {
  req.user = undefined;
  res.redirect("/api");
});
app.route("/api/dietPage").get(function(req, res) {
  res.render("diet");
});
app.route("/api/createMealPlanButton").get(function(req, res) {
  if (!req.isAuthenticated()) {
    res.render("login");
  } else {
    res.render("diet");
  }
});
app.route("/api/signup").get(function(req, res) {
  res.render("signup");
});
app.route("/api/joinText").get(function(req, res) {
  res.render("joinText");
});
module.exports = app;
