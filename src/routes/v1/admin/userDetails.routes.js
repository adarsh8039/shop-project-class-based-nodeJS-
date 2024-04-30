const express = require("express");
const { adminUserModule } = require("../../../controllers");
const { roleVerification } = require("../../../middleware/verifyRole");
const router = express.Router();

const userObject = new adminUserModule.adminUserController();
const roleVerify = new roleVerification();

router.get("/admin/listUsers", roleVerify.verifyAdmin, async (req, res) => {
  const allUsers = await userObject.listAllUser(req);
  res.status(allUsers.status).send(allUsers);
});

router.get(
  "/admin/userDetails/:id",
  roleVerify.verifyAdmin,
  async (req, res) => {
    const detailsUser = await userObject.userDetails(req);
    res.status(detailsUser.status).send(detailsUser);
  }
);

module.exports = router;
