const Product = require("../model/productModel");

async function addProductController(req, res) {
  const { title, discription, slug, categoryId, subCategoryId, images } =
    req.body;

  try {
    // const imgArry = [];
    // req.files.forEach((element) => {
    //   imgArry.push({
    //     imagePath: element.path,
    //   });
    // });
    const addProduct = await new Product({
      title: title,
      discription: discription,
      slug: slug,
      categoryId: categoryId,
      subCategoryId: subCategoryId,
      image: images,
    }).save();
    res.status(200).send({ addProduct, message: "Product Added !" });
  } catch (error) {
    res.status(401).send({ error, message: "Product Not Added!" });
  }
}

module.exports = addProductController;
