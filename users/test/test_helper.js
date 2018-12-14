const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

before(done => {
  mongoose.connect(
    "mongodb://localhost/users_test",
    { useNewUrlParser: true }
  );
  mongoose.connection
    .once("open", () => {
      done();
    })
    .on("error", error => {
      console.warn("Warning", error);
      done();
    });
});

beforeEach(done => {
  const { users, comments, blogposts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});

// USING ASYNC/AWAIT

// before(async () => {
//   await mongoose.connect("mongodb://localhost/users_test");
//   await mongoose.connection
//     .once("open", () => {})
//     .on("error", error => console.warn("Warning", error));
// });
//
// beforeEach(async () => await mongoose.connection.collections.users.drop());
