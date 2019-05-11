const router = require("express").Router();
const dietService = require(__dirname + "/dietService");

router.post("/diet", dietService.createDiet);
router.put("/update-progress", dietService.updateProgress);

module.exports = router;
