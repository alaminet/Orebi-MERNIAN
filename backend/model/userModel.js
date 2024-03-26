const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  otp: String,
  token: String,
  verify: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["admin", "editor", "marchant", "user"],
    default: "user",
  },
});

module.exports = mongoose.model("User", userSchema);
