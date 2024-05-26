const Category = require("../model/categoryModel");

async function deleteCategoryController(req, res) {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Category Deleted !" });
  } catch (error) {
    res.status(401).json({ message: "Not Deleted !" });
  }
}

module.exports = deleteCategoryController;
