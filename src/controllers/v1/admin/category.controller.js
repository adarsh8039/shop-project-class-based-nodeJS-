const {
  createdResponse,
  successResponse,
} = require("../../../helper/responses");
const db = require("../../../models/index");
const Category = db.CategoryModel;

class adminCategoryController {
  // CATEGORY INSERT
  async addCategory(req, res) {
    try {
      const { categoryName } = req.body;

      const prepareData = {
        categoryName: categoryName,
      };
      const store = await Category.create(prepareData);
      return createdResponse("category created", store);

      // console.log("Category created", store);
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
        return successResponse("Category details fetched ", getCategoryById);
      } else {
        return badRequestResponse("record not found");
      }
    } catch (error) {
      return internalServerErrorResponse(error.message);
    }
  }

  // CATEGORY LISTING
  async listCategory(req, res) {
    try {
      const getAllCategory = await Category.findAll();
      return successResponse("Category listed", getAllCategory);
    } catch (error) {
      return internalServerErrorResponse(error.message);
    }
  }

  // CATEGORY UPDATE
  async updateCategory(req, res) {
    try {
      const { categoryName } = req.body;
      const id = req.params.id;

      const update_data = {
        categoryName: categoryName,
      };

      const update = await Category.update(update_data, { where: { id: id } });
      return createdResponse("Category updated sucessfully", update);
    } catch (error) {
      return internalServerErrorResponse(error.message);
    }
  }

  // CATEGORY DELETE
  async deleteCategory(req, res) {
    try {
      const deletedata = Category.destroy({
        where: {
          id: req.params.id,
        },
      });
      return successResponse("Category Deleted", deletedata);
    } catch (error) {
      return internalServerErrorResponse(error.message);
    }
  }
}

module.exports = { adminCategoryController };
