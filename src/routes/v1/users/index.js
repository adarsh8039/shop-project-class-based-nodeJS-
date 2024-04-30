const express = require("express");
const router = express.Router();

router.use(require("./auth.routes"));
router.use(require("./cart.routes"));
router.use(require("./order.routes"));
router.use(require("./product.routes"));
router.use(require("./category.routes"));
router.use(require("./subCategory.routes"));

module.exports = router;
