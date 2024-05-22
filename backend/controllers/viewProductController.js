const Product = require("../model/productModel");

async function viewProductController(req, res) {
  const productList = await Product.find();
  res.send(productList);
}

module.exports = viewProductController;
