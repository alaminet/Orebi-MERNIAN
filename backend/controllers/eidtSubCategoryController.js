const SubCategory = require("../model/subCategoryModel");

async function editSubCategoryController(req, res) {
  const { id, name } = req.body;

  try {
    const catEdit = await SubCategory.findByIdAndUpdate(
      id,
      {
        name: name.toLowerCase().trim(),
      },
      { new: true }
    );
    res.status(200).send({ catEdit, message: "Sub-Category Edited !" });
  } catch (error) {
    res.status(401).send({ message: "Not Edited !" });
  }
}

module.exports = editSubCategoryController;
