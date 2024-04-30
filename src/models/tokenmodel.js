"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tokenModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tokenModel.init(
    {
      id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER(10),
        require: true,
        allowNull: false,
        refrences: {
          model: "user",
          key: "id ",
        },
      },
      token: {
        type: DataTypes.INTEGER(10),
        require: true,
        allowNull: false,
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
      modelName: "tokenModel",
    }
  );
  return tokenModel;
};
