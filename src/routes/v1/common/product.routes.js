const express = require("express");
const { userProductModule } = require("../../../controllers");
const router = express.Router();

const productObject = new userProductModule.userProductController();

router.get("/listAllProducts", async (req, res) => {
  const productList = productObject.listAllProduct(req);
  res.status(productList.status).send(productList);
});

router.get("/productDetail/:id", async (req, res) => {
  const productDetail = await productObject.detailsProduct(req);
  res.status(productDetail.status).send(productDetail);
});

module.exports = router;
