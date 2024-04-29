const SubCategory = require("../model/subCategoryModel");

async function viewSubCategoryController(req, res) {
  const SubCategoryList = await SubCategory.find().populate("categoryID");
  res.send(SubCategoryList);
}

module.exports = viewSubCategoryController;
