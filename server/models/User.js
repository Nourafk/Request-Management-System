const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required."],
  },
  username: {
    type: String,
    required: [true, "username is required."],
  },
  password: {
    type: String,
    required: [true, "password is required."],
  },
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;