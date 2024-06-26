const Category = require("../model/categoryModel");

async function categoryStatusController(req, res) {
  const { id, status } = req.body;

  try {
    const CatStatusUp = await Category.findByIdAndUpdate(
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
    res.status(200).send({ CatStatusUp, message: "Category Updated !" });
  } catch (error) {
    res.status(401).send({ message: "Not Updated !" });
  }
}

module.exports = categoryStatusController;
