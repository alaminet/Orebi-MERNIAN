const mongoose = require("mongoose");

let mongoConfig = () => {
  mongoose
    .connect(process.env.mongodbURL)
    .then(() => console.log("mongoDB Connected!"));
};

module.exports = mongoConfig;
