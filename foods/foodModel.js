const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  proteins: {
    type: Number,
    required: true
  },
  fats: {
    type: Number,
    required: true
  },
  carbohydrates: {
    type: Number,
    required: true
  },
  vegan: Boolean,
  vegetarian: Boolean
});

mongoose.model("Food", foodSchema);
