const mongoose = require("mongoose");
require("../diets/dietModel.js");
const Diet = mongoose.model("Diet");

const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
require("sinon-mongoose");

describe("Create a new diet", function() {
  it("should create a new diet", function(done) {
    let DietMock = sinon.mock(
      new Diet({
        currentDiet: true,
        goal: "Gain",
        startingWeight: 88,
        goalWeight: 92,
        foodRestriction: "Vegan",
        calories: 2300
      })
    );
    let diet = DietMock.object;
    let expectedResult = { status: true };
    DietMock.expects("save").yields(null, expectedResult);
    diet.save(function(err, result) {
      DietMock.verify();
      DietMock.restore();
      expect(result.status).to.be.true;
      done();
    });
  });

  it("should return error, if diet not saved", function(done) {
    let DietMock = sinon.mock(
      new Diet({
        currentDiet: true,
        goal: "Gain",
        startingWeight: 88,
        goalWeight: 92,
        foodRestriction: "Vegan",
        calories: 2300
      })
    );
    let diet = DietMock.object;
    let expectedResult = { status: false };
    DietMock.expects("save").yields(expectedResult, null);
    diet.save(function(err, result) {
      DietMock.verify();
      DietMock.restore();
      expect(err.status).to.not.be.true;
      done();
    });
  });
});
