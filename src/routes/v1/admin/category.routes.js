const express = require("express");
const { adminCategoryModule } = require("../../../controllers");
const { roleVerification } = require("../../../middleware/verifyRole");
const router = express.Router();

const categoryObject = new adminCategoryModule.adminCategoryController();
const roleVerify = new roleVerification();

router.post("/admin/addCategory", roleVerify.verifyAdmin, async (req, res) => {
  const newCategory = await categoryObject.addCategory(req, res);
  return newCategory;
});

router.get(
  "/admin/detailsCategory/:id",
  roleVerify.verifyAdmin,
  async (req, res) => {
    const categoryDetails = await categoryObject.detailsCategory(req);
    res.status(categoryDetails.status).send(categoryDetails);
  }
);

router.get("/admin/listCategory", roleVerify.verifyAdmin, async (req, res) => {
  const categoryList = await categoryObject.listCategory(req);
  res.status(categoryList.status).send(categoryList);
});

router.put(
  "/admin/updateCategory/:id",
  roleVerify.verifyAdmin,
  async (req, res) => {
    const categoryUpdate = await categoryObject.updateCategory(req);
    res.status(categoryObject.status).send(categoryUpdate);
  }
);

router.delete(
  "/admin/deleteCategory/:id",
  roleVerify.verifyAdmin,
  async (req, res) => {
    const categoryDelete = await categoryObject.deleteCategory(req);
    res.status(categoryDelete.status).send(categoryDelete);
  }
);

module.exports = router;
