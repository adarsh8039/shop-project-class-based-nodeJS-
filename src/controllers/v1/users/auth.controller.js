const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const db = require("../../../models/index");
const {
  createdResponse,
  badRequestResponse,
  successResponse,
} = require("../../../helper/responses");
const User = db.UserModel;
const UserRole = db.UserRoleModel;

const secret = process.env.JWT_SECRET;

class userAuthController {
  // User registration
  async userRegister(req, res) {
    try {
      const {
        fullName,
        address,
        street,
        landmark,
        city,
        pincode,
        state,
        country,
        mobile,
        email,
      } = req.body;

      const plainPassword = req.body.password;

      const hashPassword = await bcrypt.hash(plainPassword, 10);
      //   console.log(hashPassword);

      const prepareData = {
        fullName: fullName,
        address: address,
        street: street,
        landmark: landmark,
        city: city,
        pincode: pincode,
        state: state,
        country: country,
        mobile: mobile,
        email: email,
        password: hashPassword,
      };

      const newUser = await User.create(prepareData);

      const storeUserRole = await UserRole.create({
        roleId: 2,
        userId: newUser.id,
      });

      return createdResponse("User registered sucessfully", newUser);
    } catch (error) {
      console.log(error);
      return internalServerErrorResponse(error.message);
    }
  }

  // Seller registration
  async sellerRegister(req, res) {
    try {
      const {
        fullName,
        address,
        street,
        landmark,
        city,
        pincode,
        state,
        country,
        mobile,
        email,
      } = req.body;

      const plainPassword = req.body.password;

      const hash = await bcrypt.hash(plainPassword, 10);
      console.log("Hash value log", hash);

      const prepareData = {
        fullName: fullName,
        address: address,
        street: street,
        landmark: landmark,
        city: city,
        pincode: pincode,
        state: state,
        country: country,
        mobile: mobile,
        email: email,
        password: hash,
      };

      const store = await User.create(prepareData);

      // console.log("Data store log", store.id);

      const roleStore = await UserRole.create({
        roleId: 3,
        userId: store.id,
      });
      const secret = process.env.JwtSecret;
      // console.log(roleStore);

      return createdResponse("Seller Registered sucessfully", store);
    } catch (error) {
      console.log(error);
      return internalServerErrorResponse(error.message);
    }
  }

  // User login
  async userLogin(req, res) {
    try {
      const secret = process.env.JWT_SECRET;
      // console.log({ secret });
      const user = await User.findOne({ where: { email: req.body.email } });
      if (!user || (user.password !== null && user.password === undefined)) {
        return badRequestResponse("Incorrect email and password");
      }
      if (user) {
        const validPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (validPassword) {
          const userRole = await UserRole.findOne({
            where: { userId: user.id },
          });
          console.log({ userRole });
          if (userRole.roleId == 2) {
            const token = jwt.sign(
              { id: user.id, email: user.email, role: "user" },
              secret
            );
            return successResponse("User logged in sucessfully", token);
          } else {
            return badRequestResponse("Invalid email");
          }
        } else {
          return badRequestResponse("Incorrect password");
        }
      } else {
        return badRequestResponse("User not found");
      }
    } catch (error) {
      console.log(error);
      return internalServerErrorResponse(error.message);
    }
  }

  // seller login
  async sellerLogin(req, res) {
    try {
      const secret = process.env.JWT_SECRET;
      // console.log({ secret });
      const user = await User.findOne({ where: { email: req.body.email } });
      if (!user || (user.password !== null && user.password === undefined)) {
        return badRequestResponse("Incorrect email and password");
      }
      if (user) {
        const validPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (validPassword) {
          const userRole = await UserRole.findOne({
            where: { userId: user.id },
          });
          // console.log({ userRole });
          if (userRole.roleId == 3) {
            const token = jwt.sign(
              { id: user.id, email: user.email, role: "seller" },
              secret
            );
            return successResponse("Seller logged in sucessfully", token);
          } else {
            return badRequestResponse("Invalid email");
          }
        } else {
          return badRequestResponse("Incorrect password");
        }
      } else {
        return badRequestResponse("User not found");
      }
    } catch (error) {
      console.log(error);
      return internalServerErrorResponse(error.message);
    }
  }

  async changePassword(req, res) {
    try {
      const { oldPassword, newPassword, reEnterNewPassword } = req.body;

      const secret = process.env.JWT_SECRET;
      var token = req.headers.authorization.replace("Brarer ", "");
      const decode = jwt.verify(token, secret);
      const user_id = decode.id;

      const findUser = await User.findOne({ where: { id: user_id } });

      const validateOldPass = await bcrypt.compare(
        oldPassword,
        findUser.password
      );

      if (!validateOldPass) {
        return badRequestResponse("Incorrect Old password");
      }

      if (newPassword !== reEnterNewPassword) {
        return badRequestResponse("New password not matched");
      }

      const newHashPassword = await bcrypt.hash(newPassword, 10);
      console.log("Hash value log", newHashPassword);

      const preparePasswordUpdate = {
        password: newHashPassword,
      };

      const updatePassword = await User.update(preparePasswordUpdate, {
        where: {
          id: findUser.id,
        },
      });

      return createdResponse("Password updated sucessfully", updatePassword);
    } catch (error) {
      return internalServerErrorResponse(error.message);
    }
  }
}

module.exports = { userAuthController };
