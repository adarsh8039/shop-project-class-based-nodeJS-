const express = require("express");
const router = express.Router();

router.use(require("./auth.routes"));
router.use(require("./category.routes"));
router.use(require("./product.routes"));
router.use(require("./subCategory.routes"));
router.use(require("./userDetails.routes"));

module.exports = router;
