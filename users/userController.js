const router = require("express").Router();
const userService = require(__dirname + "/userService");

router.post("/register", function(req, res) {
  userService.register(req, res);
});
router.post("/login", function(req, res) {
  userService.login(req, res);
});
router.get("/test", function(req, res) {
  console.log("works");
});

module.exports = router;
