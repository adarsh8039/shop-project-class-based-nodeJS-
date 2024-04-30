const {
  successResponse,
  badRequestResponse,
} = require("../../../helper/responses");
const db = require("../../../models/index");
const User = db.UserModel;

class adminUserController {
  // LIST ALL USERS
  async listAllUser(req, res) {
    try {
      const listAllUser = await User.findAll();
      return successResponse("All users featched sucessfully", listAllUser);
    } catch (error) {
      return internalServerErrorResponse(error.message);
    }
  }

  // Details User
  async userDetails(req, res) {
    try {
      const getUserById = await User.findOne({ where: { id: req.params.id } });
      if (getUserById) {
        return res.status(200).json({
          success: true,
          message: "User Details featched sucessfully",
          data: getUserById,
        });
      } else {
        return badRequestResponse("User not found");
      }
    } catch (error) {
      return internalServerErrorResponse(error.message);
    }
  }
}

module.exports = { adminUserController };
