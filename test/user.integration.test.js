const app = require("../app");
const request = require("supertest");
const agent = request.agent(app);

require("sinon-mongoose");

describe("User integration testing", function() {
  describe("Register a user", function() {
    it("Should get status equal succes", function(done) {
      agent
        .post("/api/register")
        .send({
          username: "username",
          password: "password"
        })
        .set("Accept", "application/json")
        .expect(200)
        .end(function(err, results) {
          done();
        });
    });
  });
});
