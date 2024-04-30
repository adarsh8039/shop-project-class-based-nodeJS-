const express = require("express");
const { userCategoryModule } = require("../../../controllers");
const { roleVerification } = require("../../../middleware/verifyRole");
const router = express.Router();

const categoryObject = new userCategoryModule.userCategoryController();
const roleVerify = new roleVerification();

router.get("/user/listCategory", roleVerify.verifyUser, async (req, res) => {
  const listCategory = await categoryObject.listCategory(req);
  res.status(listCategory.status).send(listCategory);
});

router.get(
  "/user/detailsCategory/:id",
  roleVerify.verifyUser,
  async (req, res) => {
    const detailsCategory = await categoryObject.detailsCategory(req);
    res.status(detailsCategory.status).send(detailsCategory);
  }
);

module.exports = router;
