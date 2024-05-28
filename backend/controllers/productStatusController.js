const Product = require("../model/productModel");

async function productStatusController(req, res) {
  const { id, status } = req.body;

  try {
    const productStatusUp = await Product.findByIdAndUpdate(
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
    res.status(200).send({ productStatusUp, message: "Product Status Updated !" });
  } catch (error) {
    res.status(401).send({ message: "Status Not Updated !" });
  }
}

module.exports = productStatusController;
