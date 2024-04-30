"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("CartItemsModels", {
      id: {
        type: Sequelize.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      cartId: {
        type: Sequelize.INTEGER(10),
        refrences: {
          model: "cart",
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
        required: true,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER(10),
        required: true,
        allowNull: false,
      },
      totalAmount: {
        type: Sequelize.INTEGER(10),
        require: true,
        allowNull: false,
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
    await queryInterface.dropTable("CartItemsModels");
  },
};
