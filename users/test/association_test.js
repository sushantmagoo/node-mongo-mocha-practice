const mongoose = require("mongoose");
const assert = require("assert");

const User = require("../src/user");
const Comment = require("../src/comment");
const BlogPost = require("../src/blogPost");

describe("Associations", () => {
  let sushant, blogPost, comment;

  beforeEach(done => {
    sushant = new User({ name: "Sushant" });
    blogPost = new BlogPost({
      title: "title1",
      content: "something something"
    });
    comment = new Comment({
      content: "just a comment"
    });

    sushant.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = sushant;

    Promise.all([sushant.save(), blogPost.save(), comment.save()]).then(() =>
      done()
    );
  });

  it("saves a relation between user and blogpost", done => {
    User.findOne({ name: "Sushant" })
      .populate("blogPosts")
      .then(user => {
        assert.equal(user.blogPosts[0].title, "title1");
        done();
      });
  });

  it("saves a full relation graph", done => {
    User.findOne({ name: "Sushant" })
      .populate({
        path: "blogPosts",
        populate: {
          path: "comments",
          model: "comment",
          populate: {
            path: "user",
            model: "user"
          }
        }
      })
      .then(user => {
        assert.equal(user.name, "Sushant");
        assert.equal(user.blogPosts[0].title, "title1");
        assert.equal(user.blogPosts[0].comments[0].content, "just a comment");
        assert.equal(user.blogPosts[0].comments[0].user.name, "Sushant");
        done();
      });
  });
});
