const express = require("express");
const secureAPI = require("../../middleware/secureAPI");
const registrationController = require("../../controllers/registrationController");
const matchOTPController = require("../../controllers/matchOTPController");
const route = express.Router();

route.post("/registration", secureAPI, registrationController);
route.post("/matchOTP", secureAPI, matchOTPController);

module.exports = route;
