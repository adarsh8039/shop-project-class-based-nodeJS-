const express = require("express");
const { adminAuthModule } = require("../../../controllers");
const { roleVerification } = require("../../../middleware/verifyRole");
const router = express.Router();

const authObject = new adminAuthModule.adminAuthController();
const roleVerify = new roleVerification();

router.post("/admin/login", async (req, res) => {
  const login = await authObject.adminLogin(req);
  // console.log(login.status);
  res.status(login.status).send(login);
});

router.post(
  "/admin/changePassword",
  roleVerify.verifyAdmin,
  async (req, res) => {
    const passwordChange = await authObject.changeAdminPassword(req);
    res.status(passwordChange.status).send(passwordChange);
  }
);

router.post("/admin/forgetPassword", async (req, res) => {
  const forgetPasswordEmail = await authObject.adminForgetPassword(req);
  res.status(forgetPasswordEmail.status).send(forgetPasswordEmail);
});

router.post("/admin/resetPassword", async (req, res) => {
  const resetPassword = await authObject.resetForgetPassword(req);
  res.status(resetPassword.status).send(resetPassword);
});

module.exports = router;
