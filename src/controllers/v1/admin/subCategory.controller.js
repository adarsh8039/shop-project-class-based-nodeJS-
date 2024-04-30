const {
  badRequestResponse,
  successResponse,
  createdResponse,
} = require("../../../helper/responses");
const db = require("../../../models/index");
const Category = db.CategoryModel;
const SubCategory = db.SubCategoryModel;

class adminSubCategoryController {
  // SUB-CATEGORY INSERT
  async addSubCategory(req, res) {
    try {
      const { subCategoryName, categoryId } = req.body;
      const category = await Category.findOne({
        where: { id: req.body.categoryId },
      });
      if (!category) {
        console.log("Invalid category");
        return badRequestResponse("Invalid category");
      }

      // console.log("------", categoryId);
      if (categoryId === category.id) {
        const prepareData = {
          subCategoryName: subCategoryName,
          categoryId: categoryId,
        };
        // console.log("==========", prepareData);
        const store = await SubCategory.create(prepareData);
        // res.send("sub category created");

        return successResponse("Sub-Category Created", store);

        // console.log("sub category created");
      }
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

  // SUB-CATEGORY LISTING
  async listSubCategory(req, res) {
    try {
      const getAllSubCategories = await SubCategory.findAll();
      return successResponse("Sub-Category listed", getAllSubCategories);
    } catch (error) {
      return internalServerErrorResponse(error.message);
    }
  }

  // SUB-CATEGORY UPDATE
  async updateSubCategory(req, res) {
    try {
      const { subCategoryName, categoryId } = req.body;
      const id = req.params.id;
      const getCategory = await Category.findOne({
        where: {
          id: categoryId,
        },
      });
      if (!getCategory) {
        return badRequestResponse("Unable to find category");
      }
      if (getCategory.id === parseInt(categoryId)) {
        const update_data = {
          subCategoryName: subCategoryName,
          categoryId: categoryId,
        };
        const update_subCategory = await SubCategory.update(update_data, {
          where: { id: id },
        });
        return createdResponse("Sub category Updated", update_subCategory);
      } else {
        return badRequestResponse("Invalid Category id");
      }
    } catch (error) {
      return internalServerErrorResponse(error.message);
    }
  }

  // SUB-CATEGORY DELETE
  async deleteSubCategory(req, res) {
    try {
      const deleteData = SubCategory.destroy({
        where: {
          id: req.params.id,
        },
      });
      return successResponse("sub category deleted", deleteData);
    } catch (error) {
      return internalServerErrorResponse(error.message);
    }
  }
}

module.exports = { adminSubCategoryController };
