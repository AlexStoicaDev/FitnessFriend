const mongoose = require("mongoose");

const dailyDietSchema = new mongoose.Schema({
  firstMeal: Object,
  secondMeal: Object,
  thirdMeal: Object
});

mongoose.model("DailyDiet", dailyDietSchema);
