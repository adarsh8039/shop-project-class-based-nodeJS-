const express = require("express");
const { userCategoryModule } = require("../../../controllers");

const router = express.Router();

const categoryObject = new userCategoryModule.userCategoryController();

router.get("/listCategory", async (req, res) => {
  const listCategory = await categoryObject.listCategory(req);
  res.status(listCategory.status).send(listCategory);
});

router.get("/detailsCategory/:id", async (req, res) => {
  const detailsCategory = await categoryObject.detailsCategory(req);
  res.status(detailsCategory.status).send(detailsCategory);
});

module.exports = router;
