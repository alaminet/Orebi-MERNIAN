const mongoose = require("mongoose");

let mongoConfig = () => {
  mongoose
    .connect(
      "mongodb+srv://orebiUser:Jgz70h7l9GLwFL0D@mernian.2u33ewx.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => console.log("mongoDB Connected!"));
};

module.exports = mongoConfig;
