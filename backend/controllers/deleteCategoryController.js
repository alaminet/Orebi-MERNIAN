const Category = require("../model/categoryModel");

async function deleteCategoryController(req, res) {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Category Deleted !" });
  } catch (error) {
    res.status(401).send({ message: "Not Deleted !" });
  }
}

module.exports = deleteCategoryController;
