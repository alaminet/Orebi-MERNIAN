const Product = require("../model/productModel");

async function addProductController(req, res) {
  const {
    title,
    discription,
    slug,
    proType,
    categoryId,
    subCategoryId,
    images,
    salePrice,
    regularPrice,
    costPrice,
    quantity,
  } = req.body;

  try {
    // const imgArry = [];
    // req.files.forEach((element) => {
    //   imgArry.push({
    //     imagePath: element.path,
    //   });
    // });
    const productExist = await Product.findOne({ slug: slug });
    if (productExist) {
      return res
        .status(401)
        .send({ message: "Product Allready Exist! Change Title" });
    }

    const addProduct = await new Product({
      title: title,
      discription: discription,
      slug: slug,
      proType: proType,
      categoryId: categoryId,
      subCategoryId: subCategoryId,
      salePrice: salePrice,
      regularPrice: regularPrice,
      costPrice: costPrice,
      quantity: quantity,
      image: images,
    }).save();
    res.status(200).send({ addProduct, message: "Product Added !" });
  } catch (error) {
    console.log(error);

    res.status(401).send({ error, message: "Product Not Added!" });
  }
}

module.exports = addProductController;
