const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: String,
  image: String,
  status: {
    type: String,
    enum: ["hold", "approve"],
    default: "hold",
  },
});

module.exports = mongoose.model("Product", productSchema);
