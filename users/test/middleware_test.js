const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");

describe("Middleware", () => {
  let sushant, blogPost;

  beforeEach(done => {
    sushant = new User({ name: "Sushant" });
    blogPost = new BlogPost({
      title: "title1",
      content: "something something"
    });
    sushant.blogPosts.push(blogPost);
    Promise.all([sushant.save(), blogPost.save()]).then(() => done());
  });

  it("removes blogposts if their user gets removed", done => {
    sushant
      .remove()
      .then(() => BlogPost.count())
      .then(count => {
        assert.equal(count, 0);
        done();
      });
  });
});
