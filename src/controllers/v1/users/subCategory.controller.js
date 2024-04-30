const {
  successResponse,
  badRequestResponse,
} = require("../../../helper/responses");
const db = require("../../../models/index");
const Category = db.CategoryModel;
const SubCategory = db.SubCategoryModel;

class userSubCategoryController {
  // SUB-CATEGORY LISTING
  async listSubCategory(req, res) {
    try {
      const getAllSubCategories = await SubCategory.findAll();
      return successResponse("Sub-Category listed", getAllSubCategories);
    } catch (error) {
      return internalServerErrorResponse(error.message);
    }
  }

  // SUB-CATEGORY DETAILS
  async detailsSubCategory(req, res) {
    try {
      const getSubCategoryById = await SubCategory.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (getSubCategoryById) {
        return successResponse("Sub-category details", getSubCategoryById);
      } else {
        return badRequestResponse("Sub-category record not found");
      }
    } catch (error) {
      return internalServerErrorResponse(error.message);
    }
  }
}

module.exports = { userSubCategoryController };
