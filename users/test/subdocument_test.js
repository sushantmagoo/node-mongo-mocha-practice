const assert = require("assert");
const User = require("../src/user");

describe("subdocument", () => {
  it("can create a subdocument", done => {
    const sushant = new User({
      name: "Sushant",
      postCount: 0,
      posts: [{ title: "title1" }]
    });
    sushant.save().then(() => {
      User.findOne({ name: "Sushant" }).then(user => {
        assert.equal(user.posts[0].title, "title1");
        done();
      });
    });
  });

  it("can add post to an existing user", done => {
    const sushant = new User({
      name: "Sushant",
      posts: []
    });
    sushant
      .save()
      .then(() => User.findOne({ name: "Sushant" }))
      .then(user => {
        user.posts.push({ title: "title1" });
        return user.save();
      })
      .then(() => User.findOne({ name: "Sushant" }))
      .then(user => {
        assert.equal(user.posts[0].title, "title1");
        done();
      });
  });

  it("can remove an existing subdocument", done => {
    const sushant = new User({ name: "Sushant", posts: [{ title: "title1" }] });
    sushant
      .save()
      .then(user => {
        const post = user.posts[0];
        post.remove();
        return user.save();
      })
      .then(() => User.findOne({ name: "Sushant" }))
      .then(user => {
        assert.equal(user.posts.length, 0);
        done();
      });
  });
});
