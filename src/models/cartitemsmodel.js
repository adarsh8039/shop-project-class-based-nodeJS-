"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CartItemsModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // CartItemsModel.hasOne(models.ProductModel, {
      //   foreignKey: "productId",
      // });
      // this.belongsTo(models.CartModel);
      // this.belongsTo(models.ProductModel);
    }
  }
  CartItemsModel.init(
    {
      id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      cartId: {
        type: DataTypes.INTEGER(10),
        refrences: {
          model: "CartModel",
          key: "id",
        },
      },
      productId: {
        type: DataTypes.INTEGER(10),
        refrences: {
          model: "product",
          key: "id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER(10),
        required: true,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER(10),
        required: true,
        allowNull: false,
      },
      totalAmount: {
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
      modelName: "CartItemsModel",
    }
  );
  return CartItemsModel;
};
