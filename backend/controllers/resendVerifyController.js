const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const sendEmail = require("../helper/sendEmail");
const otpTemplate = require("../helper/otpTemplate");

async function resendVefityController(req, res) {
  const { email } = req.body;
  const existingUser = await User.find({ email });

  if (existingUser.length == 0) {
    res.status(401).json({ message: "Email Not matched, Try again!" });
  } else {
    if (existingUser.length > 0 && !existingUser[0].verify) {
      jwt.sign({ email: email }, "AxmaH7vSa8", async function (err, token) {
        const otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          specialChars: false,
          lowerCaseAlphabets: false,
        });
        const sendVerifyLink = await User.findOneAndUpdate(
          { email },
          { $set: { otp: otp, token: token } },
          { new: true }
        );
        await sendVerifyLink.save();

        // OTP & link send to email
        sendEmail(email, otp, token, otpTemplate);
      });

      res.status(200).send({ message: "Link Send to your mail" });
    } else {
      res.status(401).send({ message: "Already You are verifyed" });
    }
  }
}

module.exports = resendVefityController;
