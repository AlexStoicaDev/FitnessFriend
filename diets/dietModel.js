const mongoose = require("mongoose");
require("/FitnessFriend/users/userModel.js");
require("/FitnessFriend/foods/foodModel.js");

const dietSchema = new mongoose.Schema({
  //should be used for reactivate diet functionality
  currentDiet: {
    type: Boolean,
    required: true
  },
  goal: {
    type: String,
    enum: ["Loose", "Mantain", "Gain"]
  },
  startingWieght: {
    type: Number,
    required: true
  },
  goalWeight: {
    type: Number,
    required: true
  },
  foodType: {
    type: String,
    enum: ["vegan", "vegetarian", "omnivor"]
  },

  weighIns: [{ date: Date, weight: Number }],
  foods: [{ type: mongoose.Schema.Types.ObjectId, ref: "Food" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

mongoose.model("Diet", dietSchema);
