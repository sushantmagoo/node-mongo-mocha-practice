const assert = require("assert");
const User = require("../src/user");

describe("Creating records", () =>
  it("save a user", done => {
    new User({ name: "Sushant" })
      .save()
      .then(result => {
        assert(!result.isNew);
        done();
      })
      .catch(error => {
        console.log(error);
        done(error);
      });
  }));

// USING ASYNC/AWAIT
// describe("Creating records", () =>
//   it("save a user", async () => {
//     let result = await new User({ name: "Sushant" }).save();
//     assert(!result.isNew);
//   }));
