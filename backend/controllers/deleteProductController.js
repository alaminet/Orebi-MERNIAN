const Product = require("../model/productModel");

async function deleteProductController(req, res) {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Product Deleted !" });
  } catch (error) {
    res.status(401).send({ message: "Not Deleted !" });
  }
}

module.exports = deleteProductController;
