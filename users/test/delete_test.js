const assert = require("assert");
const User = require("../src/user");

describe("Deleting a user", () => {
  let Sushant;
  beforeEach(done => {
    Sushant = new User({ name: "Sushant" });
    Sushant.save().then(() => done());
  });

  it("removes using model instance", done => {
    Sushant.remove()
      .then(() => User.findOne({ name: "Sushant" }))
      .then(user => {
        assert.equal(user, null);
        done();
      });
  });

  it("removes using class method", done => {
    User.remove({ name: "Sushant" })
      .then(() => User.findOne({ name: "Sushant" }))
      .then(user => {
        assert.equal(user, null);
        done();
      });
  });

  it("removes using class method findOneAndRemove", done => {
    User.findOneAndRemove({ name: "Sushant" })
      .then(() => User.findOne({ name: "Sushant" }))
      .then(user => {
        assert.equal(user, null);
        done();
      });
  });

  it("removes using class method findByIdAndRemove", done => {
    User.findByIdAndRemove({ _id: Sushant.id }) // or User.findByIdAndRemove(Sushant.id)
      .then(() => User.findOne({ name: "Sushant" }))
      .then(user => {
        assert.equal(user, null);
        done();
      });
  });
});
