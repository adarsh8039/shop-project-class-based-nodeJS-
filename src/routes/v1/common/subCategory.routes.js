const express = require("express");
const { userSubCategoryModule } = require("../../../controllers");

const router = express.Router();

const subCategoryObject = new userSubCategoryModule.userSubCategoryController();

router.get("/listSubCategory", async (req, res) => {
  const subCategoryList = await subCategoryObject.listSubCategory(req);
  res.status(subCategoryList.status).send(subCategoryList);
});

router.get("/detailsSubCategory/:id", async (req, res) => {
  const subCategoryDetail = await subCategoryObject.detailsSubCategory(req);
  res.status(subCategoryDetail.status).send(subCategoryDetail);
});

module.exports = router;
