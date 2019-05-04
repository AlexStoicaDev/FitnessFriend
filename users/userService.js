const passport = require("/FitnessFriend/config/passport.js");
const mongoose = require("mongoose");
require(__dirname + "/userModel.js");
const User = mongoose.model("User");

module.exports.register = function(req, res) {
  User.register({ username: req.body.username }, req.body.password, function(
    err,
    user
  ) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function() {
        res.send("registered");
      });
    }
  });
};

module.exports.login = function(req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
  req.logIn(user, function(err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function() {
        res.send("login with success");
      });
    }
  });
};

module.exports.test = function(param) {
  console.log(param);
};
