const {
  successResponse,
  badRequestResponse,
} = require("../../../helper/responses");
const db = require("../../../models/index");
const Category = db.CategoryModel;

class userCategoryController {
  // CATEGORY LISTING
  async listCategory(req, res) {
    try {
      const getAllCategory = await Category.findAll();
      return successResponse("Category listed", getAllCategory);
    } catch (error) {
      return internalServerErrorResponse(error.message);
    }
  }

  // CATEGORY DETAILS
  async detailsCategory(req, res) {
    try {
      const getCategoryById = await Category.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (getCategoryById) {
        return successResponse("Category details fetched", getCategoryById);
      } else {
        return badRequestResponse("record not found");
      }
    } catch (error) {
      return internalServerErrorResponse(error.message);
    }
  }
}

module.exports = { userCategoryController };
