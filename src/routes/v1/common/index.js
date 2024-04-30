const express = require("express");
const router = express.Router();

router.use(require("./category.routes"));
router.use(require("./product.routes"));
router.use(require("./subCategory.routes"));
router.use(require("./imageUpload.routes"));

module.exports = router;
