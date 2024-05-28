const SubCategory = require("../model/subCategoryModel");

async function deleteSubCategoryController(req, res) {
  try {
    await SubCategory.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Sub-Category Deleted !" });
  } catch (error) {
    res.status(401).send({ message: "Not Deleted !" });
  }
}

module.exports = deleteSubCategoryController;
