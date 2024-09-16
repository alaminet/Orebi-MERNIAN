const SubCategory = require("../model/subCategoryModel");

async function viewSubCategoryController(req, res) {
  try {
    const SubCategoryList = await SubCategory.find().populate("categoryID");
    res.status(200).send(SubCategoryList);
  } catch (error) {
    res.status(404).send(error);
  }
}

module.exports = viewSubCategoryController;
