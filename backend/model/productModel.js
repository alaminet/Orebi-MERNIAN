const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: String,
  discription: String,
  image: String,
  status: {
    type: String,
    enum: ["waiting", "approve", "reject"],
    default: "waiting",
  },
});

module.exports = mongoose.model("Product", productSchema);
