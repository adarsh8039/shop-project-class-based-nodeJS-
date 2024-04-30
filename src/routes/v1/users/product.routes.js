const express = require("express");
const { userProductModule } = require("../../../controllers");
const { upload } = require("../../../helper/imageUpload");
const { roleVerification } = require("../../../middleware/verifyRole");
const router = express.Router();

const productObject = new userProductModule.userProductController();
const roleVerify = new roleVerification();

// seller product route
router.post(
  "/seller/addProducts",
  roleVerify.verifySeller,
  upload.single("Image"),
  async (req, res) => {
    const newProduct = await productObject.addProducts(req);
    res.status(newProduct.status).send(newProduct);
  }
);

router.get("/seller/details/:id", roleVerify.verifySeller, async (req, res) => {
  const productDetails = await productObject.detailsProduct(req);
  res.status(productDetails.status).send(productDetails);
});

router.get(
  "/seller/listAllProducts",
  roleVerify.verifySeller,
  async (req, res) => {
    const allProducts = await productObject.listAllProductForSeller(req);
    res.status(allProducts.status).send(allProducts);
  }
);

router.put(
  "/seller/updateProduct/:id",
  roleVerify.verifySeller,
  upload.single("image"),
  async (req, res) => {
    const productUpdate = await productObject.updateProduct(req);
    res.status(productUpdate.status).send(productUpdate);
  }
);

router.delete(
  "seller/deleteProduct",
  roleVerify.verifySeller,
  async (req, res) => {
    const productDelete = await productObject.deleteProduct(req);
    res.status(productDelete.status).send(productDelete);
  }
);

// User product route
router.get("/user/listAllProduct", roleVerify.verifyUser, async (req, res) => {
  const getAllProduct = await productObject.listAllProduct(req);
  res.status(getAllProduct.status).send(getAllProduct);
});

router.get(
  "/user/productDetails/:id",
  roleVerify.verifyUser,
  async (req, res) => {
    const detailsProduct = await productObject.detailsProduct(req);
    res.status(detailsProduct.status).send(detailsProduct);
  }
);

module.exports = router;
