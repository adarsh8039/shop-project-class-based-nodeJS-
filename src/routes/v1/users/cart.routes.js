const express = require("express");
const { userCartModule } = require("../../../controllers");
const { roleVerification } = require("../../../middleware/verifyRole");
const router = express.Router();

const cartObject = new userCartModule.userCartController();
const roleVerify = new roleVerification();

router.post("/user/addToCart", roleVerify.verifyUser, async (req, res) => {
  const newCart = await cartObject.addToCart(req);
  res.status(newCart.status).send(newCart);
});

router.post(
  "/user/increaseCartQuantity/:productId",
  roleVerify.verifyUser,
  async (req, res) => {
    const incrementData = await cartObject.increaseCartQuantity(req);
    res.status(incrementData.status).send(incrementData);
  }
);

router.post(
  "/user/decreaseCartQuantity/:productId",
  roleVerify.verifyUser,
  async (req, res) => {
    const decrementData = await cartObject.decreaseCartQuantity(req);
    res.status(decrementData.status).send(decrementData);
  }
);
router.delete(
  "/seller/removeFromCart/:productId",
  roleVerify.verifyUser,
  async (req, res) => {
    const removeData = await cartObject.removeFromCart(req);
    res.status(removeData.status).send(removeData);
  }
);

module.exports = router;
