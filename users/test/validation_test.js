const assert = require("assert");
const User = require("../src/user");

describe("Validating records", () => {
  it("requires a username", done => {
    const user = User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert.equal(message, "Name is required");
    done();
  });
  it("requires a username longer than 2 character", done => {
    const user = new User({ name: "Su" });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert.equal(message.toString(), "Name must be longer than 2 characters");
    done();
  });
  it("disallows invalid records from being saved", done => {
    const user = new User({ name: "Su" });
    user.save().catch(validationResult => {
      const { message } = validationResult.errors.name;
      assert.equal(message.toString(), "Name must be longer than 2 characters");
      done();
    });
  });
});
