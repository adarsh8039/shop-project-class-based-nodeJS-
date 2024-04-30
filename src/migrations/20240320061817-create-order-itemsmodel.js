"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("OrderItemsModels", {
      id: {
        type: Sequelize.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      orderId: {
        type: Sequelize.INTEGER(10),
        refrences: {
          model: "order",
          key: "id",
        },
      },

      productId: {
        type: Sequelize.INTEGER(10),
        refrences: {
          model: "product",
          key: "id",
        },
      },

      quantity: {
        type: Sequelize.INTEGER(10),
        require: true,
        allowNull: false,
      },

      price: {
        type: Sequelize.INTEGER(10),
        require: true,
        allowNull: false,
      },

      totalPrice: {
        type: Sequelize.INTEGER(10),
        require: true,
        allowNull: false,
      },

      orderStatus: {
        type: Sequelize.ENUM("pending", "accepted", "dispatched", "deleivered"),
        defaultValue: "pending",
        require: true,
        allowNull: false,
      },

      OrderDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },

      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },

      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("OrderItemsModels");
  },
};
