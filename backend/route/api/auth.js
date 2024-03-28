const express = require("express");
const secureAPI = require("../../middleware/secureAPI");
const registrationController = require("../../controllers/registrationController");
const matchOTPController = require("../../controllers/matchOTPController");
const loginController = require("../../controllers/loginController");
const resendVefityController = require("../../controllers/resendVerifyController");
const matchEmailLinkController = require("../../controllers/matchEmailLinkController");
const forgotPassController = require("../../controllers/forgotPassControlle");
const matchForgotPassController = require("../../controllers/matchForgotPassController");
const route = express.Router();

route.post("/registration", secureAPI, registrationController);
route.post("/matchOTP", secureAPI, matchOTPController);
route.post("/login", secureAPI, loginController);
route.post("/resendVerify", secureAPI, resendVefityController);
route.post("/matchEmail", secureAPI, matchEmailLinkController);
route.post("/forgotPass", secureAPI, forgotPassController);
route.post("/matchPass", secureAPI, matchForgotPassController);

module.exports = route;
