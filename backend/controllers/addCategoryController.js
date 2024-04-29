const Category = require("../model/categoryModel");

async function addCategoryController(req, res) {
  const { name } = req.body;
  const existingCategory = await Category.find({
    name: name.toLowerCase().trim(),
  });

  if (existingCategory.length > 0) {
    res.status(401).json({ message: "Category Allready Exist!" });
  } else {
    const addCategory = await new Category({
      name: name.toLowerCase().trim(),
    });
    await addCategory.save();
    res.status(200).json({ message: "Category Added !" });
  }
}

module.exports = addCategoryController;
