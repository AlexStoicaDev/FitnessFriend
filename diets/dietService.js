const mongoose = require("mongoose");
require(__dirname + "/dietModel.js");
const Diet = mongoose.model("Diet");
const userService = require("/FitnessFriend/users/userService");
module.exports.createDiet = function(req, res) {
  if (!req.isAuthenticated()) {
    res.status(401);
    res.send(process.env.NOT_AUTHENTICATED_TEXT);
  }
  userService.findUserById(req.user._id, function(foundUser) {
    const userDiet = createDietForUser(req.body, foundUser);
    addDietToUserDietArray(userDiet, foundUser);
    userDiet.save();
    foundUser.save();
    res.send("diet has been created");
  });
};

function createDietForUser(dietInObject, foundUser) {
  return new Diet({
    ...dietInObject,
    currentDiet: true,
    weighIns: [],
    foods: [],
    user: foundUser
  });
}
function addDietToUserDietArray(userDiet, foundUser) {
  let diets = foundUser.diets;
  if (diets != undefined) {
    foundUser.diets.push(userDiet);
  } else {
    foundUser.diets = [userDiet];
  }
}
