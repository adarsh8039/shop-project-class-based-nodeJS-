const express = require("express");
const { userProductModule } = require("../../../controllers");
const { upload } = require("../../../helper/imageUpload");
const { roleVerification } = require("../../../middleware/verifyRole");
const router = express.Router();

const productObject = new userProductModule.userProductController();
const roleVerify = new roleVerification();

router.post(
  "/admin/addProduct",
  roleVerify.verifyAdmin,
  upload.single("image"),
  async (req, res) => {
    const newProduct = await productObject.addProducts(req);
    res.status(newProduct.status).send(newProduct);
  }
);

router.get(
  "/admin/detailsProduct/:id",
  roleVerify.verifyAdmin,
  async (req, res) => {
    const productDetails = await productObject.detailsProduct(req);
    res.status(productDetails.status).send(productDetails);
  }
);

router.get("/admin/listProduct", roleVerify.verifyAdmin, async (req, res) => {
  const productList = await productObject.listAllProduct(req);
  res.status(productList.status).send(productList);
});

router.put(
  "/admin/updateProduct/:id",
  roleVerify.verifyAdmin,
  async (req, res) => {
    const productUpdate = await productObject.updateProduct(req);
    res.status(productUpdate.status).send(productUpdate);
  }
);

router.delete(
  "/admin/deleteProduct/:id",
  roleVerify.verifyAdmin,
  async (req, res) => {
    const productDelete = await productObject.deleteProduct(req);
    res.status(productDelete.status).send(productDelete);
  }
);

module.exports = router;
