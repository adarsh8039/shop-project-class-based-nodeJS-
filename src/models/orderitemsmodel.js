"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderItemsModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderItemsModel.init(
    {
      id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      orderId: {
        type: DataTypes.INTEGER(10),
        refrences: {
          model: "order",
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
        require: true,
        allowNull: false,
      },

      price: {
        type: DataTypes.INTEGER(10),
        require: true,
        allowNull: false,
      },

      totalPrice: {
        type: DataTypes.INTEGER(10),
        require: true,
        allowNull: false,
      },

      orderStatus: {
        type: DataTypes.ENUM("pending", "accepted", "dispatched", "deleivered"),
        defaultValue: "pending",
        require: true,
        allowNull: false,
      },

      OrderDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
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
      modelName: "OrderItemsModel",
    }
  );
  return OrderItemsModel;
};
