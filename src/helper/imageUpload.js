const multer = require("multer");
const path = require("path");

// var upPath = ("../uploads/products");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "src/v1/upload/products/");
  },
  filename: function (req, file, callback) {
    let extension = path.extname(file.originalname);
    let basename = path.basename(file.originalname, extension);
    console.log(file.path);
    callback(null, file.originalname + "-" + Date.now() + ".jpg");
  },
});

// console.log({ storage });

const upload = multer({ storage: storage });
// console.log({ upload });

module.exports = { upload: upload };
