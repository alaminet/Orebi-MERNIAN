const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: String,
  discription: String,
  salePrice: Number,
  regularPrice: Number,
  costPrice: Number,
  quantity: Number,
  image: [{ imagePath: String }],
  slug: String,
  proType: String,
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  subCategoryId: {
    type: Schema.Types.ObjectId,
    ref: "SubCategory",
  },
  status: {
    type: String,
    enum: ["waiting", "approve", "reject"],
    default: "waiting",
  },
});

module.exports = mongoose.model("Product", productSchema);
