const express = require("express");
const { adminSubCategoryModule } = require("../../../controllers");
const { roleVerification } = require("../../../middleware/verifyRole");
const router = express.Router();

const subCategoryObject =
  new adminSubCategoryModule.adminSubCategoryController();
const roleVerify = new roleVerification();

router.post(
  "/admin/addSubCategory",
  roleVerify.verifyAdmin,
  async (req, res) => {
    const newSubCategory = await subCategoryObject.addSubCategory(req);
    res.status(newSubCategory.status).send(newSubCategory);
  }
);

router.get(
  "/admin/detailsSubCategory/:id",
  roleVerify.verifyAdmin,
  async (req, res) => {
    const subCategorydetails = await subCategoryObject.detailsSubCategory(req);
    res.status(subCategorydetails.status).send(subCategorydetails);
  }
);

router.get(
  "/admin/listSubCategory",
  roleVerify.verifyAdmin,
  async (req, res) => {
    const subCategoryList = await subCategoryObject.listSubCategory(req);
    res.status(subCategoryList.status).send(subCategoryList);
  }
);

router.put(
  "/admin/updateSubCategory/:id",
  roleVerify.verifyAdmin,
  async (req, res) => {
    const subCategoryUpdate = await subCategoryObject.updateSubCategory(req);
    res.status(subCategoryUpdate.status).send(subCategoryUpdate);
  }
);

router.delete(
  "/admin/deleteSubCategory/:id",
  roleVerify.verifyAdmin,
  async (req, res) => {
    const subCategoryDelete = await subCategoryObject.deleteSubCategory(req);
    res.status(subCategoryDelete.status).send(subCategoryDelete);
  }
);

module.exports = router;
