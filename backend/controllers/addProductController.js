const Product = require("../model/productModel");

async function addProductController(req, res) {
  const { title } = req.body;
  try {
    const addProduct = await new Product({
      title: title,
      image: `/upload/images/profile/${req.file.filename}`,
    });
    await addProduct.save();
    res.status(200).json({ addProduct, message: "Product Added !" });
  } catch (error) {
    res.status(401).json({ message: "Product Not Added!" });
  }
}

module.exports = addProductController;