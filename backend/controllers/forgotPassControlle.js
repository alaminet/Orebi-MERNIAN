const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const forgotPassEmail = require("../helper/forgotpassEmail");
const forgotPassTemplate = require("../helper/forgotPassTemplate");

async function forgotPassController(req, res) {
  const { email } = req.body;
  const existingUser = await User.find({ email });

  if (existingUser.length > 0) {
    jwt.sign({ email: email }, "AxmaH7vSa8", async function (err, token) {
      const sendVerifyLink = await User.findOneAndUpdate(
        { email },
        { $set: { token: token } },
        { new: true }
      );
      await sendVerifyLink.save();

      // OTP & link send to email
      forgotPassEmail(email, token, forgotPassTemplate);
    });

    res.status(200).send({ message: "Link Send to your mail" });
  } else {
    res.status(401).send({ message: "Email Not matched, Try again!" });
  }
}

module.exports = forgotPassController;
