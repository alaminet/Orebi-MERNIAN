const express = require("express");
const secureAPI = require("../../middleware/secureAPI");
const registrationController = require("../../controllers/registrationController");
const matchOTPController = require("../../controllers/matchOTPController");
const loginController = require("../../controllers/loginController");
const route = express.Router();

route.post("/registration", secureAPI, registrationController);
route.post("/matchOTP", secureAPI, matchOTPController);
route.post("/login", secureAPI, loginController);

module.exports = route;
