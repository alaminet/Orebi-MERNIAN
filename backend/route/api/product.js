const express = require("express");
const multer = require("multer");
const secureAPI = require("../../middleware/secureAPI");
const addCategoryController = require("../../controllers/addCategoryController");
const addSubCategoryController = require("../../controllers/addSubCategoryController");
const viewSubCategoryController = require("../../controllers/viewSubCategoryController");
const viewCategoryController = require("../../controllers/viewCategoryController");
const addProductController = require("../../controllers/addProductController");
const viewProductController = require("../../controllers/viewProductController");

const route = express.Router();

// multer img upload setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
//   end multer setup

route.post("/addproduct", upload.single("prductImg"), addProductController);
route.get("/viewproduct", secureAPI, viewProductController);
route.post("/addcategory", secureAPI, addCategoryController);
route.post("/addsubcategory", secureAPI, addSubCategoryController);

route.get("/catlist", secureAPI, viewCategoryController);
route.get("/subcatlist", secureAPI, viewSubCategoryController);

module.exports = route;
