const bcrypt = require("bcrypt");
const User = require("../model/userModel");

async function loginController(req, res) {
  const { email, password } = req.body;
  const existingUser = await User.find({ email });

  if (existingUser.length > 0) {
    if (existingUser[0].verify) {
      bcrypt.compare(
        password,
        existingUser[0].password,
        function (err, result) {
          if (result) {
            return res.json({
              success: "Login Successfull",
            });
          } else {
            return res.status(401).send({
              error: "Password not matched",
            });
          }
        }
      );
    } else {
      return res.status(401).send({
        error: "Please Verify your OTP",
      });
    }
  } else {
    return res.status(401).send({
      error: "Email not matched",
    });
  }
}

module.exports = loginController;
