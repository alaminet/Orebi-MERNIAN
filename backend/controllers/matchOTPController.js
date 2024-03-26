const User = require("../model/userModel");

async function matchOTPController(req, res) {
  const { otp, email } = req.body;
  const existingUser = await User.find({ email });

  if (!existingUser[0].verify && existingUser[0].otp === otp) {
    const removeOTP = await User.findOneAndUpdate(
      { email },
      { $unset: { otp: "", token: "" }, $set: { verify: true } },
      { new: true }
    );
    removeOTP.save();
    res.status(200).json({ removeOTP, message: "OTP Matched" });
  } else {
    res.status(401).json({ message: "Wrong OTP, Try again!" });
  }
}

module.exports = matchOTPController;
