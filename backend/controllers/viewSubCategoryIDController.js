const SubCategory = require("../model/subCategoryModel");

async function viewSubCategoryIDController(req, res) {
  try {
    const SubCategoryList = await SubCategory.find({
      categoryID: req.params.id,
    }).populate("categoryID");
    res.status(200).send(SubCategoryList);
  } catch (error) {
    res.status(404).send(error);
  }
}

module.exports = viewSubCategoryIDController;
