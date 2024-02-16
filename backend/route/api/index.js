const express = require("express");
const route = express.Router();
const auth = require("./auth");

route.use("/auth", auth);

route.get("/", function (req, res) {
  res.send("api folders");
});

module.exports = route;
