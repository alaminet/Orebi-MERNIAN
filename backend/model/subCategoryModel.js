const mongoose = require("mongoose");
const { Schema } = mongoose;

const subCategorySchema = new Schema({
  name: String,
  status: {
    type: String,
    enum: ["waiting", "approve", "reject"],
    default: "waiting",
  },
  categoryID: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

module.exports = mongoose.model("SubCategory", subCategorySchema);
