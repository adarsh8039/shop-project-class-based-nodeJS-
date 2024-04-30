const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

const {
  successResponse,
  unauthorizedResponse,
  internalServerErrorResponse,
  badRequestResponse,
  createdResponse,
} = require("../../../helper/responses");

const db = require("../../../models/index");
const User = db.UserModel;
const UserRole = db.userRoleModel;
const Token = db.tokenModel;

const secret = process.env.JWT_SECRET;

class adminAuthController {
  // admin login
  async adminLogin(req, res) {
    try {
      // console.log({ secret });
      const user = await User.findOne({ where: { email: req.body.email } });
      if (!user || (user.password !== null && user.password === undefined)) {
        return unauthorizedResponse("Incorrect email and password");
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
          if (userRole.roleId == 1) {
            const token = jwt.sign(
              { id: user.id, email: user.email, role: "admin" },
              secret
            );
            // return res.status(200).json({
            //   success: true,
            //   message: "Admin logged in sucessfully",
            //   data: token,
            // });
            return successResponse("Admin login sucess", token);
          } else {
            return unauthorizedResponse("Invalid Email");
          }
        } else {
          return unauthorizedResponse("Incorrect password");
        }
      } else {
        return unauthorizedResponse("User not found");
      }
    } catch (error) {
      console.log(error);
      return internalServerErrorResponse(error.message);
    }
  }

  async changeAdminPassword(req, res) {
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

      return createdResponse(updatePassword, "Password updated sucessfully");
    } catch (error) {
      return internalServerErrorResponse(error.message);
    }
  }

  async adminForgetPassword(req, res) {
    try {
      const { email } = req.body;

      const verifyEmail = await User.findOne({ where: { email: email } });

      if (!verifyEmail) {
        return badRequestResponse("Email id not exist");
      }

      const forgetToken = Math.floor(100000 + Math.random() * 900000);

      const prepareTokenData = {
        userId: verifyEmail.id,
        token: forgetToken,
      };

      const createToken = await Token.create(prepareTokenData);

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: "gmail",
        pool: true,
        port: 587,
        secure: false,
        auth: {
          user: `${process.env.MAIL}`,
          pass: `${process.env.MAIL_PASSWORD}`,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      transporter.use(
        "compile",
        hbs({
          viewEngine: {
            extname: ".hbs",
            layoutsDir: "./sec/templates/",
            defaultLayout: false,
            partialsDir: "./src/templates/",
          },
          viewPath: "./src/templates/",
          extName: ".hbs",
        })
      );

      const userMail = verifyEmail.email;
      const sendMail = async function main(req, res) {
        const info = await transporter.sendMail({
          from: `${process.env.MAIL}`,
          to: `${userMail}`,
          subject: "OTP for password reset of your account",
          context: {
            forgetToken: forgetToken,
            user: userMail,
          },
          template: "email_template",
        });

        console.log("--------->info", { info });

        console.log({ message: "Message sent: %s", data: info });
        console.log({ message: "Message sent: %s", data: info.messageId });
        console.log({
          msg: "Hey ! You got an email",
          info: info.messageId,
        });
      };

      sendMail().catch(console.error);

      return successResponse(
        "Your password reset code will be sent on your email"
      );
    } catch (error) {
      console.log(error);
      return internalServerErrorResponse(error.message);
    }
  }

  async resetForgetPassword(req, res) {
    try {
      const { email, secretCode, newPassword, reEnterNewPassword } = req.body;
      const verifyEmail = await User.findOne({ where: { email: email } });

      if (!verifyEmail) {
        return badRequestResponse("Sorry ! Wrong email");
      }

      const verifyUserIdWithMail = await Token.findOne({
        where: { userId: verifyEmail.id },
      });

      if (!verifyUserIdWithMail) {
        return badRequestResponse("Sorry! password changing request not found");
      }

      if (secretCode !== verifyUserIdWithMail.token) {
        return badRequestResponse("Invalid secret code");
      }

      if (newPassword !== reEnterNewPassword) {
        return badRequestResponse("New password not matched");
      }

      const newHashPassword = await bcrypt.hash(newPassword, 10);
      console.log("Hash data", newHashPassword);

      const preparePasswordReset = {
        password: newHashPassword,
      };

      const updateResetPassword = await User.update(preparePasswordReset, {
        where: {
          email: verifyEmail.email,
        },
      });

      return successResponse("Your password has been reset sucessfully");
    } catch (error) {
      console.log(error);
      return internalServerErrorResponse(error.message);
    }
  }
}

module.exports = { adminAuthController };
