const assert = require("assert");
const User = require("../src/user");

describe("Updating records", () => {
  let Sushant;

  beforeEach(done => {
    Sushant = new User({ name: "Sushant", likes: 0 });
    Sushant.save().then(() => {
      done();
    });
  });

  // HACK: Helpler function to assert update
  function assertName(operation, callback) {
    operation.then(() => {
      User.find({}).then(users => {
        assert.equal(users.length, 1);
        assert.equal(users[0].name, "sushy");
        callback();
      });
    });
  }

  it("updates using instance type set and save", done => {
    Sushant.set("name", "sushy");
    assertName(Sushant.save(), done);
  });

  it("updates using instance type update", done => {
    assertName(Sushant.update({ name: "sushy" }), done);
  });

  it("updates using class type update, update all records", done => {
    assertName(User.update({ name: "Sushant" }, { name: "sushy" }), done);
  });

  it("updates using class type findOneAndUpdate, update only one record", done => {
    assertName(
      User.findOneAndUpdate({ name: "Sushant" }, { name: "sushy" }),
      done
    );
  });

  it("updates using class type findByIdAndUpdate, update with an Id", done => {
    assertName(User.findOneAndUpdate(Sushant._id, { name: "sushy" }), done);
  });

  it("updates every user's postCount, incrementing by 1 ", done => {
    User.update({ name: "Sushant" }, { $inc: { likes: 1 } }).then(() => {
      User.findOne({ name: "Sushant" }).then(user => {
        assert.equal(user.likes, 1);
        done();
      });
    });
  });
});
