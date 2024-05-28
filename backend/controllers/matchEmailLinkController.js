const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

async function matchEmailLinkController(req, res) {
  const { email, token } = req.body;
  var decoded = jwt.verify(token, "AxmaH7vSa8");

  const existingUser = await User.find({ email });
  if (
    existingUser.length > 0 &&
    existingUser[0].email === decoded.email &&
    !existingUser[0].verify
  ) {
    const matchEmail = await User.findOneAndUpdate(
      { email },
      { $unset: { otp: "", token: "" }, $set: { verify: true } },
      { new: true }
    );
    matchEmail.save();
    res.status(200).send({ matchEmail, message: "OTP Matched" });
  } else {
    res.status(401).send({ message: "invalid Email, Try again!" });
  }
}

module.exports = matchEmailLinkController;
