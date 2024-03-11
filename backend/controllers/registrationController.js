const User = require("../model/userModel");
const bcrypt = require("bcrypt");

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
      const user = await new User({
        name: name,
        email: email,
        password: hash,
      });
      await user.save();
      res.send({
        name: user.name,
        email: user.email,
      });
    });
  }
};

module.exports = registrationController;
