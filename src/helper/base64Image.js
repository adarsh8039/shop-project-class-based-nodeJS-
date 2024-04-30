// "use strict";
const Buffer = require("buffer").Buffer;
const path = require("path");
const fs = require("fs");

/**
 * @param  {string} filename
 */
function encode_base64(filename) {
  //   const file = req.body.file;
  fs.readFile(
    path.join(__dirname, "/public/", filename),
    function (error, data) {
      if (error) {
        throw error;
      } else {
        let buf = Buffer.from(data);
        let base64 = buf.toString("base64");
        // console.log("Base64 " + filename + ": " + base64);
        return base64;
      }
    }
  );
}

/**
 * @param  {string} base64str
 * @param  {string} filename
 */
function decode_base64(base64str, filename) {
  let buf = Buffer.from(base64str, "base64");

  fs.writeFile(
    path.join(__dirname, "/public/", filename),
    buf,
    function (error) {
      if (error) {
        throw error;
      } else {
        console.log("File created from base64 string!");
        return true;
      }
    }
  );
}

// encode_base64("../../vivo-v30-1.jpg");
// decode_base64("any_base64_string_goes_here", "rane.jpg");

module.exports = {
  encode_base64,
  decode_base64,
};
