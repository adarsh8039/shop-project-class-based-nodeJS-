const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const {
  badRequestResponse,
  createdResponse,
  successResponse,
} = require("../../../helper/responses");
const secret = process.env.JWT_SECRET;

const db = require("../../../models/index");

const Product = db.ProductModel;
const Category = db.CategoryModel;
const SubCategory = db.SubCategoryModel;

class userProductController {
  // PRODUCT INSERT
  async addProducts(req, res) {
    try {
      const {
        productName,
        description,
        price,
        categoryId,
        subCategoryId,
        quantity,
      } = req.body;

      console.log("Body -------->", req.body);
      console.log("file -------->", req.file.path);

      const getCategory = await Category.findOne({
        where: { id: req.body.categoryId },
      });
      //   console.log("string value", getCategory.id.toString());

      //   console.log("Category id ==============>", getCategory.id);
      if (!getCategory) {
        res.status(404).json({ message: "Unable to find category" });
      }

      const subCatId = await SubCategory.findOne({
        where: { id: req.body.subCategoryId },
      });
      //   console.log("Category id ==============>", subCatId.id);

      if (!subCatId) {
        // res.send("Unable to find Sub-category");
        return badRequestResponse("Unable to find Sub-category");
      }

      var tokens = req.headers.authorization.replace("Bearer ", "");
      const decode = jwt.verify(tokens, secret);
      // console.log(decode);

      //   console.log("----------->", parseInt(getCategory.id));
      //   console.log("----------->", parseInt(categoryId));

      if (getCategory.id === parseInt(categoryId)) {
        if (subCatId.id === parseInt(subCategoryId)) {
          const prepareData = {
            productName: productName,
            description: description,
            price: price,
            image: req.file.path,
            // image: req.file,
            categoryId: categoryId,
            subCategoryId: subCategoryId,
            vendor: decode.id,
            quantity: quantity,
          };

          const store = await Product.create(prepareData);
          return createdResponse("Product created", store);
        } else {
          return badRequestResponse("Invalid! Sub-category not found");
        }
      } else {
        return badRequestResponse("Invalid! Category not found");
      }
    } catch (error) {
      console.log("------->", error);
      return internalServerErrorResponse(error.message);
    }
  }

  // PRODUCT DETAILS
  async detailsProduct(req, res) {
    try {
      const getProductById = await Product.findOne({
        include: { model: SubCategory },
        where: { id: req.params.id },
      });
      return successResponse("Product details featched", getProductById);
    } catch (error) {
      return internalServerErrorResponse(error.message);
    }
  }

  // PRODUCT LISTING
  async listAllProduct(req, res) {
    try {
      const { product, category, subCategory, search } = req.query;

      var whereClause = {};
      var categoryClause = {};
      var subCategoryClause = {};

      if (product) {
        whereClause.productName = { [Op.like]: "%" + product + "%" };
      }

      if (category) {
        categoryClause.categoryName = { [Op.like]: "%" + category + "%" };
      }

      if (subCategory) {
        subCategoryClause.subCategoryName = {
          [Op.like]: "%" + subCategory + "%",
        };
      }

      const searchValue = { [Op.like]: "%" + search + "%" };

      let options = [];
      console.log({ searchValue });

      options.push({
        [Op.or]: [
          {
            productName: searchValue,
          },
          {
            "$CategoryModel.categoryName$": searchValue,
          },
          {
            "$SubCategoryModel.subCategoryName$": searchValue,
          },
        ],
      });

      if (search && options.length > 0) {
        whereClause[Op.and] = options;
      }

      // console.log({ options });
      // console.log("whereClause =====================>", whereClause);

      if (search) {
        const products = await Product.findAndCountAll({
          where: whereClause,
          include: [
            {
              model: Category,
              where: categoryClause,
              // include: [],
            },
            { model: SubCategory, where: subCategoryClause },
          ],
        });
        return successResponse("Result of products", products);
      }

      const getProduct = await Product.findAndCountAll({
        where: whereClause,
        include: {
          model: Category,
          where: categoryClause,
          include: [{ model: SubCategory, where: subCategoryClause }],
        },
      });

      return successResponse("Result of products", getProduct);
    } catch (error) {
      console.log(error);
      return internalServerErrorResponse(error.message);
    }
  }

  async listAllProductForSeller(req, res) {
    try {
      const { product, category, subCategory, search } = req.query;
      var tokens = req.headers.authorization.replace("Bearer ", "");
      const decode = jwt.verify(tokens, secret);

      var whereClause = {};
      // var parentClause = {};
      var categoryClause = {};
      var subCategoryClause = {};

      if (product) {
        whereClause.productName = { [Op.like]: "%" + product + "%" };
      }

      if (category) {
        categoryClause.categoryName = { [Op.like]: "%" + category + "%" };
      }

      if (subCategory) {
        subCategoryClause.subCategoryName = {
          [Op.like]: "%" + subCategory + "%",
        };
      }

      const searchValue = { [Op.like]: "%" + search + "%" };

      let options = [];
      // console.log({ searchValue });

      options.push({
        [Op.or]: [
          {
            productName: searchValue,
          },
          {
            "$CategoryModel.categoryName$": searchValue,
          },
          {
            "$SubCategoryModel.subCategoryName$": searchValue,
          },
        ],
      });

      if (search && options.length > 0) {
        whereClause[Op.and] = options;
      }

      if (search) {
        console.log({ whereClause });

        const products = await Product.findAndCountAll({
          where: {
            vendor: decode.id,
            ...whereClause,
          },

          include: [
            {
              model: Category,
              where: categoryClause,
            },
            {
              model: SubCategory,
              where: subCategoryClause,
            },
          ],
        });
        return successResponse("Result of products", products);
      }

      const getAllProd = await Product.findAndCountAll({
        where: {
          vendor: decode.id,
          ...whereClause,
        },
        include: [
          {
            model: Category,
            where: categoryClause,
          },
          {
            model: SubCategory,
            where: subCategoryClause,
          },
        ],
      });
      return successResponse("All Product Listed", getAllProd);
    } catch (error) {
      console.log(error);
      return internalServerErrorResponse(error.message);
    }
  }

  // PRODUCT UPDATE
  async updateProduct(req, res) {
    try {
      const {
        productName,
        description,
        price,
        categoryId,
        subCategoryId,
        quantity,
      } = req.body;

      const getCategory = await Category.findOne({
        where: { id: categoryId },
      });

      if (!getCategory) {
        return badRequestResponse("unable to find category");
      }

      const getSubCategoryId = await SubCategory.findOne({
        where: { id: subCategoryId },
      });

      if (!getSubCategoryId) {
        return badRequestResponse("unable to find sub-category");
      }

      if (getCategory.id === parseInt(categoryId)) {
        if (getSubCategoryId.id === parseInt(subCategoryId)) {
          const update_data = {
            productName: productName,
            description: description,
            price: price,
            image: req.file.path,
            categoryId: categoryId,
            subCategoryId: subCategoryId,
            quantity: quantity,
          };

          const final_update = await Product.update(update_data, {
            where: { id: req.params.id },
          });
          return createdResponse("Product updated sucessfully", final_update);
        }
      }
    } catch (error) {
      console.log("---------->", error);
      return internalServerErrorResponse(error.message);
    }
  }

  // PRODUCT DELETE
  async deleteProduct(req, res) {
    try {
      Product.destroy({
        where: {
          id: req.params.id,
        },
      });
      return successResponse("Product deleted sucessfully");
    } catch (error) {
      return internalServerErrorResponse(error.message);
    }
  }
}

module.exports = { userProductController };
