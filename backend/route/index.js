const express = require("express");
const route = express.Router();
const apiRoute = require("./api");

route.use("/api", apiRoute);

route.get("/", function (req, res) {
  res.send("route folder");
});

module.exports = route;
