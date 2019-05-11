const mongoose = require("mongoose");
require(__dirname + "/userModel.js");
const User = mongoose.model("User");
const passport = require("passport");
require("../config/passport.js");
const nexmo = require("../config/nexmo.js");

module.exports.register = function(req, res) {
  User.register({ username: req.body.username }, req.body.password)
    .then(() => {
      passport.authenticate("local")(req, res, function() {
        res.send("registered");
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400);
      res.send(err);
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
      res.status(400);
      res.send(err);
    } else {
      passport.authenticate("local")(req, res, function() {
        res.send("login with success");
      });
    }
  });
};

module.exports.googleAuth = passport.authenticate("google", {
  scope: ["profile"]
});

module.exports.findUserById = function(userId, callback) {
  User.findById(userId, function(err, foundUser) {
    callback(foundUser);
  });
};

module.exports.subscribeToDailyTextMessage = function(req, res) {
  if (!req.isAuthenticated()) {
    res.status(401);
    res.send(process.env.NOT_AUTHENTICATED_TEXT);
  }
  User.findById(req.user._id, function(err, foundUser) {
    foundUser.subscribedToTextMessages = true;
    // foundUser.phoneNumber = req.body.phoneNumber;
    foundUser.phoneNumber = process.env.DEV_PHONE_NUMBER;
    foundUser.save();
    nexmo.message.sendSms(
      process.env.NEXMO_FROM,
      foundUser.phoneNumber,
      process.env.NEXMO_HELLO_TEXT
    );
    res.send("Subscribed to daily text messages");
  });
};
module.exports.unsubscribeToDailyTextMessage = function(req, res) {
  if (!req.isAuthenticated()) {
    res.status(401);
    res.send(process.env.NOT_AUTHENTICATED_TEXT);
  }
  User.findById(req.user._id, function(err, foundUser) {
    foundUser.subscribedToTextMessages = false;
    foundUser.phoneNumber = "";
    foundUser.save();
    res.send("Unsubscribed from daily text messages");
  });
};
