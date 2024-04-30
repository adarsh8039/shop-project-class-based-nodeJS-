const express = require("express");
const router = express.Router();

router.use(require("./admin/index"));
router.use(require("./users/index"));
router.use(require("./common/index"));

module.exports = router;
