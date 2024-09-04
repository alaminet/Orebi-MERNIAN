const SubCategory = require("../model/subCategoryModel");

async function viewCatCascaderController(req, res) {
  console.log(req.params.id);
  const subCatList = await SubCategory.find({ categoryID: req.params.id });
  res.send(subCatList);
}

module.exports = viewCatCascaderController;
