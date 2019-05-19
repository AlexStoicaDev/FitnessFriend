const router = require("express").Router();
const passport = require("passport");
const userService = require(__dirname + "/userService");
const express = require("express");
router.use(express.static("public"));
router.post("/register", userService.register);
router.post("/login", userService.login);
router.get("/auth/google", userService.googleAuth);
router.get(
  "/auth/google/fitness",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    if (req.user.diets.length > 0) {
      res.redirect("/api/program");
    } else {
      res.redirect("/api/dietPage");
    }
  }
);
router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/fitness",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function(req, res) {
    if (req.user.diets.length > 0) {
      res.redirect("/api/program");
    } else {
      res.redirect("/api/dietPage");
    }
  }
);
router.post("/subscribe-daily-text", userService.subscribeToDailyTextMessage);
router.put(
  "/unsubscribe-daily-text",
  userService.unsubscribeToDailyTextMessage
);
router.post("/send-text-messages", userService.sendTextMessages);
router.delete("/delete/:userId", userService.deleteUser);
router.put("/update/:userId", userService.updateUser);

module.exports = router;
