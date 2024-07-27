const fs = require("fs");
const Product = require("../model/productModel");

async function deleteProductController(req, res) {
  try {
    await Product.findByIdAndDelete(req.params.id).then((response) => {
      const filePath = `.${response.image}`; // Replace with the actual path to your file
      // Remove the file
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error removing file: ${err}`);
          return;
        }
        console.log(`File ${filePath} has been successfully removed.`);
      });
    });
    res.status(200).send({ message: "Product Deleted !" });
  } catch (error) {
    res.status(401).send({ message: "Not Deleted !" });
  }
}

module.exports = deleteProductController;
