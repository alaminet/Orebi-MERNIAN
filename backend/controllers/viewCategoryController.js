const Category = require("../model/categoryModel");

async function viewCategoryController(req, res) {
  try {
    const CategoryList = await Category.find();
    res.status(200).send(CategoryList);
  } catch (error) {
    res.status(404).send(error);
  }
}

module.exports = viewCategoryController;
