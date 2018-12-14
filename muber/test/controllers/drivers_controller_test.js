const assert = require("assert");
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");

// NOTE:
// mocha tries to call mongo more than 1 time.
// mongoose will complain model was created more than once
const Driver = mongoose.model("driver");

describe("Drivers controller", () => {
  it("POST to /api/drivers, creates a new driver", done => {
    Driver.count().then(count => {
      request(app)
        .post("/api/drivers")
        .send({ email: "test@test.com" })
        .end(() => {
          Driver.count().then(newCount => {
            assert.equal(count + 1, newCount);
            done();
          });
        });
    });
  });

  it("PUT to /api/drivers/id edits an existing driver", done => {
    const driver = new Driver({ email: "t@t.com", driving: false });

    driver.save().then(() => {
      request(app)
        .put("/api/drivers/" + driver._id)
        .send({ driving: true })
        .end(() => {
          Driver.findOne({ email: "t@t.com" }).then(driver => {
            assert.equal(driver.driving, true);
            done();
          });
        });
    });
  });

  it("DELETE to /api/drivers/id can delete a driver", done => {
    const driver = new Driver({ email: "test@test.com" });
    driver.save().then(() => {
      request(app)
        .delete("/api/drivers/" + driver._id)
        .send({ driving: true })
        .end(() => {
          Driver.findOne({ email: "test@test.com" }).then(driver => {
            assert.equal(driver, null);
            done();
          });
        });
    });
  });

  it("GET to /api/drivers finds drivers in a location", done => {
    const seattleDriver = new Driver({
      email: "seattle@test.com",
      geometry: { type: "Point", coordinates: [-122.479903, 47.6147628] }
    });
    const miamiDriver = new Driver({
      email: "miami@test.com",
      geometry: { type: "Point", coordinates: [-80.2534507, 25.791581] }
    });

    Promise.all([seattleDriver.save(), miamiDriver.save()]).then(() => {
      request(app)
        .get("/api/drivers?lng=-80&lat=25")
        .end((err, response) => {
          assert.equal(response.body.length, 1);
          assert.equal(response.body[0].email, "miami@test.com");
          done();
        });
    });
  });
});
