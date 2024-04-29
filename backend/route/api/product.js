const express = require("express");
const secureAPI = require("../../middleware/secureAPI");
const addCategoryController = require("../../controllers/addCategoryController");
const addSubCategoryController = require("../../controllers/addSubCategoryController");
const viewSubCategoryController = require("../../controllers/viewSubCategoryController");
const viewCategoryController = require("../../controllers/viewCategoryController");
const route = express.Router();

route.post("/addcategory", secureAPI, addCategoryController);
route.post("/addsubcategory", secureAPI, addSubCategoryController);

route.get("/catlist", secureAPI, viewCategoryController);
route.get("/subcatlist", secureAPI, viewSubCategoryController);

module.exports = route;
