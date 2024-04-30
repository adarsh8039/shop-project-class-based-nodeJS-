"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SubCategoryModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.ProductModel, { foreignKey: "subCategoryId" });
    }
  }
  SubCategoryModel.init(
    {
      id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
      },
      subCategoryName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER(10),
        refrences: {
          model: "category", // table name
          key: "id", // same column name in other table
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
      modelName: "SubCategoryModel",
    }
  );
  return SubCategoryModel;
};
