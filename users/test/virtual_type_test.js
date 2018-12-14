const assert = require("assert");
const User = require("../src/user");

describe("Virtual types", function() {
  it("returns number of posts using postCount", done => {
    const sushant = new User({ name: "Sushant", posts: [{ title: "title1" }] });
    sushant
      .save()
      .then(() => User.findOne({ name: "Sushant" }))
      .then(user => {
        assert.equal(sushant.postCount, 1);
        done();
      });
  });
});
