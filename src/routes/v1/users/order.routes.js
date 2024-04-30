const express = require("express");
const { userOrderModule } = require("../../../controllers");
const { roleVerification } = require("../../../middleware/verifyRole");
const router = express.Router();

const orderObject = new userOrderModule.userOrderController();
const roleVerify = new roleVerification();

//User route
router.post("/user/placeOrder", roleVerify.verifyUser, async (req, res) => {
  const newOrder = await orderObject.createOrder(req);
  res.status(newOrder.status).send(newOrder);
});

router.get("/user/listAllOrder", roleVerify.verifyUser, async (req, res) => {
  const allOrders = await orderObject.listUserOrder(req);
  res.status(allOrders.status).send(allOrders);
});

//seller route
router.put(
  "/seller/updateOrderStatus/:orderId",
  roleVerify.verifySeller,
  async (req, res) => {
    const changeStatus = await orderObject.changeOrderStatus(req);
    res.status(changeStatus.status).send(changeStatus);
  }
);

router.get(
  "/seller/listAllOrders",
  roleVerify.verifySeller,
  async (req, res) => {
    const allOrders = await orderObject.listUserOrder(req);
    res.status(allOrders.status).send(allOrders);
  }
);

module.exports = router;
