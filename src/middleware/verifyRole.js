const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

class roleVerification {
  // VERIFY ADMIN
  async verifyAdmin(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(404).json({ message: "token not found" });
    }

    var tokens = req.headers.authorization.replace("Bearer ", "");
    const decode = jwt.verify(tokens, secret);
    // console.log(decode);
    if (!decode) return res.send("invalid");
    if (decode.role == "admin") {
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized !" });
    }
  }

  // VERIFY USER
  async verifyUser(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(404).json({ message: "token not found" });
    }

    var tokens = req.headers.authorization.replace("Bearer ", "");
    const decode = jwt.verify(tokens, secret);
    // console.log(decode);
    if (!decode) return res.send("invalid");
    if (decode.role == "user") {
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized !" });
    }
  }

  // VERIFY SELLER
  async verifySeller(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(404).json({ message: "token not found" });
    }

    var tokens = req.headers.authorization.replace("Bearer ", "");
    const decode = jwt.verify(tokens, secret);
    // console.log(decode);
    if (!decode) return res.send("invalid");
    if (decode.role == "seller") {
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized !" });
    }
  }
}

module.exports = { roleVerification };
