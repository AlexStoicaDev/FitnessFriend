const app = require("../app");
const request = require("supertest");
const agent = request.agent(app);

require("sinon-mongoose");

describe("Security tests", function() {
  describe("Get meal plan test when user is not authenticated", function() {
    it("Should get status equal UNAUTHORIZED", function(done) {
      agent
        .get("/api/program")
        .expect(401)
        .end(function(err, results) {
          done();
        });
    });
  });
  describe("Get meal plan test when user is not authenticated", function() {
    it("Should get status equal UNAUTHORIZED", function(done) {
      agent
        .post("/api/diet")
        .expect(401)
        .end(function(err, results) {
          done();
        });
    });
  });
});
