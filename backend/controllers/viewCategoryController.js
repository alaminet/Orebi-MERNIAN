const Category = require("../model/categoryModel");

async function viewCategoryController(req, res) {
  const CategoryList = await Category.find();
  res.send(CategoryList);
}

module.exports = viewCategoryController;
