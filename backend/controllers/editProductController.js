const Product = require("../model/productModel");

async function editProductController(req, res) {
  const { id, filed, value } = req.body;

  try {
    if (filed === "title") {
      const findItem = await Product.findByIdAndUpdate(id, {
        $set: { title: value },
      });
      await findItem.save();
      res.status(200).send({ findItem, message: "Product Title updated" });
    }
    if (filed === "discription") {
      const findItem = await Product.findByIdAndUpdate(id, {
        $set: { discription: value },
      });
      await findItem.save();
      res
        .status(200)
        .send({ findItem, message: "Product Discription updated" });
    }
  } catch (error) {
    res.status(401).send({ message: "Not Edited !" });
  }
}

module.exports = editProductController;
