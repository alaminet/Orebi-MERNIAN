const SubCategory = require("../model/subCategoryModel");

async function addCategoryController(req, res) {
  const { name, categoryID } = req.body;
  const existingSubCategory = await SubCategory.find({
    name: name.toLowerCase().trim(),
    categoryID: categoryID,
  });

  if (existingSubCategory.length > 0) {
    res.status(401).json({ message: "Sub-Category Allready Exist!" });
  } else {
    const addSubCategory = await new SubCategory({
      name: name.toLowerCase().trim(),
      categoryID: categoryID,
    });
    await addSubCategory.save();
    res.status(200).json({ message: "Sub-Category Added !" });
  }
}

module.exports = addCategoryController;
