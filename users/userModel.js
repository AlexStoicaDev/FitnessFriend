const findOrCreate = require("mongoose-findorcreate");
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  googleId: String,
  secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
mongoose.model("User", userSchema);
