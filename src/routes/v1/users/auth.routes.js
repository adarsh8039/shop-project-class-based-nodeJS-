const express = require("express");
const { userAuthModule } = require("../../../controllers");
const { roleVerification } = require("../../../middleware/verifyRole");
const router = express.Router();

const authObject = new userAuthModule.userAuthController();
const roleVerify = new roleVerification();

//User
router.post("/user/register", async (req, res) => {
  const register = await authObject.userRegister(req);
  res.status(register.status).send(register);
});

router.post("/user/login", async (req, res) => {
  const login = await authObject.userLogin(req);
  res.status(login.status).send(login);
});

router.post("/user/changePassword", roleVerify.verifyUser, async (req, res) => {
  const passwordChange = await authObject.changePassword(req);
  res.status(passwordChange.status).send(passwordChange);
});

//seller

router.post("/seller/register", async (req, res) => {
  const register = await authObject.sellerRegister(req);
  res.status(register.status).send(register);
});

router.post("/seller/login", async (req, res) => {
  const login = await authObject.sellerLogin(req);
  res.status(login.status).send(login);
});

router.post(
  "/seller/changePassword",
  roleVerify.verifySeller,
  async (req, res) => {
    const passwordChange = await authObject.changePassword(req);
    res.status(passwordChange.status).send(passwordChange);
  }
);

module.exports = router;
