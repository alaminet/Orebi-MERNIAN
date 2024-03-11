const express = require("express");
const secureAPI = require("../../middleware/secureAPI");
const registrationController = require("../../controllers/registrationController");
const route = express.Router();

route.post("/registration", secureAPI, registrationController);

module.exports = route;
