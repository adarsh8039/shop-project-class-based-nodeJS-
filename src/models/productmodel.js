"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.CartItemsModel, { foreignKey: "productId" });
      this.hasMany(models.OrderItemsModel, { foreignKey: "productId" });
      this.belongsTo(models.CategoryModel, {
        foreignKey: "categoryId",
      });
      this.belongsTo(models.SubCategoryModel, {
        foreignKey: "subCategoryId",
      });
    }
  }
  ProductModel.init(
    {
      id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      productName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        require: true,
      },
      description: {
        type: DataTypes.STRING(255),
        require: true,
      },
      price: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        require: true,
      },
      image: {
        type: DataTypes.STRING(200),
        require: true,
      },
      categoryId: {
        type: DataTypes.INTEGER(10),
        refrences: {
          model: "category",
          key: "id",
        },
      },
      subCategoryId: {
        type: DataTypes.INTEGER(10),
        refrences: {
          model: "subCategory",
          key: "id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        require: true,
      },
      vendor: {
        type: DataTypes.INTEGER(10),
        refrences: {
          model: "user",
          key: "id",
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "ProductModel",
    }
  );
  return ProductModel;
};
