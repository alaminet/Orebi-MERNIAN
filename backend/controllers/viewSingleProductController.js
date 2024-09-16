const Product = require("../model/productModel");

async function viewSingleProductController(req, res) {
  try {
    let viewProduct = await Product.findOne({ slug: req.params.slug });
    res.status(200).send(viewProduct);
  } catch (error) {
    res.status(401).send(error);
  }
}

module.exports = viewSingleProductController;
