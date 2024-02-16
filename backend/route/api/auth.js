const express = require("express");
const secureAPI = require("../../middleware/secureAPI");
const registrationController = require("../../controllers/registrationController");
const route = express.Router();

route.get("/registration", secureAPI, registrationController);

route.get("/", function (req, res) {
  res.send("auth folder");
});

module.exports = route;
