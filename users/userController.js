const router = require("express").Router();
const passport = require("passport");
const userService = require(__dirname + "/userService");

router.post("/register", userService.register);
router.post("/login", userService.login);
router.get("/auth/google", userService.googleAuth);
router.get(
  "/auth/google/fitness",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.send("login with google");
  }
);
router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/fitness",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.send("login with facebook");
  }
);
router.put("/subscribe-daily-text", userService.subscribeToDailyTextMessage);
router.put(
  "/unsubscribe-daily-text",
  userService.unsubscribeToDailyTextMessage
);

module.exports = router;
