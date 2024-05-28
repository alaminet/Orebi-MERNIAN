const Category = require("../model/categoryModel");

async function editCategoryController(req, res) {
  const { id, name } = req.body;

  try {
    const catEdit = await Category.findByIdAndUpdate(
      id,
      {
        name: name.toLowerCase().trim(),
      },
      { new: true }
    );
    res.status(200).send({ catEdit, message: "Category Edited !" });
  } catch (error) {
    res.status(401).send({ message: "Not Edited !" });
  }
}

module.exports = editCategoryController;
