const assert = require("assert");
const User = require("../src/user");

describe("Reading users out of the database", () => {
  let sushant, joe, maria, alex;
  beforeEach(done => {
    sushant = new User({ name: "Sushant" });
    joe = new User({ name: "Joe" });
    maria = new User({ name: "Maria" });
    alex = new User({ name: "Alex" });
    Promise.all([sushant.save(), joe.save(), maria.save(), alex.save()]).then(
      () => done()
    );
  });

  it("find all users with the name of Sushant", done => {
    User.find({ name: "Sushant" }).then(users => {
      assert(users[0]._id.toString() === sushant._id.toString());
      done();
    });
  });

  it("find a user with a particular id", done => {
    User.findOne({ _id: sushant._id })
      .then(user => {
        assert.equal(user.name, "Sushant");
        done();
      })
      .catch(error => {
        console.log(error);
        done();
      });
  });

  it("can skip and limit the result set", done => {
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then(users => {
        assert.equal(users.length, 2);
        assert.equal(users[0].name, "Joe");
        assert.equal(users[1].name, "Maria");
        done();
      });
  });
});
