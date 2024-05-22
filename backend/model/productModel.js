const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: String,
  discription: String,
  image: String,
  status: {
    type: String,
    enum: ["hold", "approve"],
    default: "hold",
  },
});

module.exports = mongoose.model("Product", productSchema);
