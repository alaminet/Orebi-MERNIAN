const express = require("express");
const route = express.Router();
const auth = require("./auth");
const product = require("./product");

route.use("/auth", auth);
route.use("/product", product);

module.exports = route;
