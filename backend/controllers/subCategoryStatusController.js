const SubCategory = require("../model/subCategoryModel");

async function subCategoryStatusController(req, res) {
  const { id, status } = req.body;

  try {
    const SubCatStatusUp = await SubCategory.findByIdAndUpdate(
      id,
      {
        status:
          status == "waiting"
            ? "approve"
            : status == "approve"
            ? "reject"
            : "waiting",
      },
      { new: true }
    );
    res.status(200).send({ SubCatStatusUp, message: "Sub-Category Updated !" });
  } catch (error) {
    res.status(401).send({ message: "Not Updated !" });
  }
}

module.exports = subCategoryStatusController;
