const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const sendEmail = require("../helper/sendEmail");
const otpTemplate = require("../helper/otpTemplate");

const registrationController = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.send({ error: "Please fill the all filed" });
  }

  if (password && password.length < 6) {
    return res.send({ error: "Password to small" });
  }

  const existingUser = await User.find({ email: email });

  if (existingUser.length > 0) {
    return res.send({ error: `${email} already used` });
  } else {
    bcrypt.hash(password, 10, async function (err, hash) {
      const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });
      const user = await new User({
        name: name,
        email: email,
        password: hash,
        otp: otp,
      });
      await user.save();

      // OTP send to email
      sendEmail(email, user.otp, otpTemplate);

      res.send({
        massage: "Registration Successful",
      });
    });
  }
};

module.exports = registrationController;
