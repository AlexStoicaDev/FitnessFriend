const findOrCreate = require("mongoose-findorcreate");
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
require("/FitnessFriend/diets/dietModel");

const userSchema = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  googleId: String,
  diets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Diet" }]
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
mongoose.model("User", userSchema);
