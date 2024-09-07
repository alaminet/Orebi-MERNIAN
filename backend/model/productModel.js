const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: String,
  discription: String,
  image: [{ imagePath: String }],
  slug: String,
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
