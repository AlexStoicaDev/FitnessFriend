const mongoose = require("mongoose");

require("../users/userModel.js");
const User = mongoose.model("User");

const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
require("sinon-mongoose");

describe("Create a new account", function() {
  it("should create a new user", function(done) {
    let UserMock = sinon.mock(
      new User({
        username: "username",
        password: "password",
        googleId: "",
        facebookId: "",
        subscribedToTextMessages: false,
        role: "basic",
        phoneNumber: "1234567891",
        diets: []
      })
    );
    let user = UserMock.object;
    let expectedResult = { status: true };
    UserMock.expects("save").yields(null, expectedResult);
    user.save(function(err, result) {
      UserMock.verify();
      UserMock.restore();
      expect(result.status).to.be.true;
      done();
    });
  });

  it("should return error, if user not saved", function(done) {
    let UserMock = sinon.mock(
      new User({
        username: "username",
        password: "password",
        googleId: "",
        facebookId: "",
        subscribedToTextMessages: false,
        role: "basic",
        phoneNumber: "1234567891",
        diets: []
      })
    );
    let user = UserMock.object;
    let expectedResult = { status: false };
    UserMock.expects("save").yields(expectedResult, null);
    user.save(function(err, result) {
      UserMock.verify();
      UserMock.restore();
      expect(err.status).to.not.be.true;
      done();
    });
  });
});
