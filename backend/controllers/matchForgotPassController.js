const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function matchForgotPassController(req, res) {
  const { email, token, password } = req.body;
  var decoded = jwt.verify(token, "AxmaH7vSa8");

  const existingUser = await User.find({ email });
  if (existingUser.length > 0 && existingUser[0].email === decoded.email) {
    bcrypt.hash(password, 10, async function (err, hash) {
      const updatePass = await User.findOneAndUpdate(
        { email },
        {
          $unset: { otp: "", token: "" },
          $set: { password: hash, verify: true },
        },
        { new: true }
      );
      updatePass.save();
      res.status(200).json({ message: "Password Updated" });
    });
  } else {
    res.status(401).json({ message: "invalid Email, Try again!" });
  }
}

module.exports = matchForgotPassController;
