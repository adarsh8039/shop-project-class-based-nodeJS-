const express = require("express");
const Buffer = require("buffer").Buffer;
const path = require("path");
const fs = require("fs");
// const { encode_base64 } = require("../../../helper/base64Image");

const router = express.Router();

router.post("/imageUpload", async (req, res) => {
  const userImage = req.file.path;
  const encode = encode_base64(userImage);
  res.status(encode.status).send(encode);
});

module.exports = router;
