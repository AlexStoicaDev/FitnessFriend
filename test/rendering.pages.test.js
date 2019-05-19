const mongoose = require("mongoose");

require("../users/userModel.js");
const User = mongoose.model("User");

const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const app = require("../app");
const request = require("supertest");
const agent = request.agent(app);

describe("Page rendering tests", function() {
  describe("Get login page", function() {
    it("Should get status equal succes", function(done) {
      agent
        .get("/api/loginPage")
        .expect(200)
        .end(function(err, results) {
          done();
        });
    });
  });

  describe("Get signup page", function() {
    it("Should get status equal succes", function(done) {
      agent
        .get("/api/signup")
        .expect(200)
        .end(function(err, results) {
          done();
        });
    });
  });

  describe("Get the create diet page", function() {
    it("Should get status equal succes", function(done) {
      agent
        .get("/api/dietPage")
        .expect(200)
        .end(function(err, results) {
          done();
        });
    });
  });
});
