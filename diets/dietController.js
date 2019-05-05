const router = require("express").Router();
const dietService = require(__dirname + "/dietService");

router.route("/diet").post(dietService.createDiet);

module.exports = router;
