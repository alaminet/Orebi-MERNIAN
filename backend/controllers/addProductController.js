const Product = require("../model/productModel");

async function addProductController(req, res) {
  const { title, discription } = req.body;
  try {
    const addProduct = await new Product({
      title: title,
      discription: discription,
      image: `/uploads/${req.file.filename}`,
    });
    await addProduct.save();
    res.status(200).send({ addProduct, message: "Product Added !" });
  } catch (error) {
    res.status(401).send({ message: "Product Not Added!" });
  }
}

module.exports = addProductController;
