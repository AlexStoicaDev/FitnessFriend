const mongoose = require("mongoose");
require(__dirname + "/dietModel.js");
const Diet = mongoose.model("Diet");
require(__dirname + "/dailyDietModel.js");
const DailyDiet = mongoose.model("DailyDiet");
const userService = require("../users/userService");
const request = require("request");
require("dotenv").config();

module.exports.createDiet = function(req, res) {
  if (!req.isAuthenticated()) {
    res.status(401);
    res.send(process.env.NOT_AUTHENTICATED_TEXT);
  }
  userService.findUserById(req.user._id, function(foundUser) {
     createDietForUser(req.body, foundUser, function(userDiet) {
      addDietToUserDietArray(userDiet, foundUser);
      userDiet.save();
      foundUser.save();
      res.send("diet has been created");
    });
  });
};

/* TODO 

  Check inputs and throw errors, for inDtos set a structure,

  !!!!!!!!!!! REPLACE CALLBACKS WIHT PROMISES !!!!!!!!!!!!!!

*/
/**
 * Women BMR = 655 + (9.6 X weight in kg) + (1.8 x height in cm) – (4.7 x age in yrs)
 *Men BMR = 66 + (13.7 X weight in kg) + (5 x height in cm) – (6.8 x age in yrs)
 * height in cm
 * age in years
 */
//fix this code
function calculateBMR(weight, height, sex, age) {
  if (sex === "female") {
    return 655 + 9.6 * weight + 1.8 * height - 4.7 * age;
  }
  return 66 + 13.7 * weight + 5 * height - 6.8 * age;
}

function getCaloriesForGoal(goal, weight, height, sex, age) {
  let bmr = calculateBMR(weight, height, sex, age);
  if (goal === "Maintain") {
    return bmr;
  }
  if (goal === "Loose") {
    return bmr - (20 * bmr) / 100;
  }

  return bmr + (20 * bmr) / 100;
}

function createDietForUser(createDietInDTO, foundUser, callback) {
  let calories = Math.floor(
    getCaloriesForGoal(
      createDietInDTO.goal,
      createDietInDTO.startingWeight,
      createDietInDTO.height,
      createDietInDTO.sex,
      createDietInDTO.age
    )
  );
  getDailyDiets(createDietInDTO.foodRestriction, calories, function(
    dailyDiets
  ) {
    let userDiet = new Diet({
      goal: createDietInDTO.goal,
      startingWeight: createDietInDTO.startingWeight,
      goalWeight: createDietInDTO.goalWeight,
      foodRestriction: createDietInDTO.foodRestriction,
      currentDiet: true,
      weighIns: [],
      dailyDiets: dailyDiets,
      calories: calories,
      user: foundUser
    });

    callback(userDiet);
  });
}
function getDailyDiets(foodRestriction, calories, callback) {
  getRecipesFromEdamamAPI(foodRestriction, calories, function(recipes) {
    let dailyDiets = [];
    for (i = 0; i < 21; i = i + 3) {
      let dailyDiet = new DailyDiet({
        firstMeal: recipes[i],
        secondMeal: recipes[i + 1],
        thirdMeal: recipes[i + 2]
      });
      dailyDiet.save({ checkKeys: false });
      dailyDiets.push(dailyDiet);
    }
    callback(dailyDiets);
  });
}
function getRecipesFromEdamamAPI(foodRestriction, calories, callback) {
  request(getEdamamRequestString(foodRestriction, calories), function(
    error,
    response,
    body
  ) {
    console.log("error:", error); // Print the error if one occurred
    console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
    recipes = JSON.parse(body).hits;
    if (recipes.length !== 21 && recipes.length > 0) {
      let i = 0;
      while (recipes.length < 21) {
        recipes[recipes.length] = recipes[i];
        i++;
      }
    }
    callback(recipes);
  });
}
function getEdamamRequestString(foodRestriction, calories) {
  let requestString =
    "https://api.edamam.com/search?q=&app_id=" +
    process.env.EDAMAM_CLIENT_ID +
    "&app_key=" +
    process.env.EDAMAM_KEY;
  requestString +=
    "&from=0&to=21&calories=" + (calories - 50) + "-" + (calories + 50);
  if (foodRestriction) {
    requestString += "&Health=" + foodRestriction;
  }
  return requestString;
}

function addDietToUserDietArray(userDiet, foundUser) {
  let diets = foundUser.diets;
  if (diets !== undefined) {
    foundUser.diets.push(userDiet);
  } else {
    foundUser.diets = [userDiet];
  }
}
