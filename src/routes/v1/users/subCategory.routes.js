const express = require("express");
const { userSubCategoryModule } = require("../../../controllers");
const { roleVerification } = require("../../../middleware/verifyRole");
const router = express.Router();

const subCategoryObject = new userSubCategoryModule.userSubCategoryController();
const roleVerify = new roleVerification();

router.get("/user/listSubCategory", roleVerify.verifyUser, async (req, res) => {
  const subCategoryList = await subCategoryObject.listSubCategory(req);
  res.status(subCategoryList.status).send(subCategoryList);
});

router.get(
  "/user/detailsSubCategory/:id",
  roleVerify.verifyUser,
  async (req, res) => {
    const subCategoryDetail = await subCategoryObject.detailsSubCategory(req);
    res.status(subCategoryList.subCategoryDetail).send(subCategoryDetail);
    return subCategoryDetail;
  }
);

module.exports = router;
