"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ProductModels", {
      id: {
        type: Sequelize.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      productName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        require: true,
      },
      description: {
        type: Sequelize.STRING(255),
        require: true,
      },
      price: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        require: true,
      },
      image: {
        type: Sequelize.STRING(200),
        require: true,
      },
      categoryId: {
        type: Sequelize.INTEGER(10),
        refrences: {
          model: "category",
          key: "id",
        },
      },
      subCategoryId: {
        type: Sequelize.INTEGER(10),
        refrences: {
          model: "subCategory",
          key: "id",
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        require: true,
      },
      vendor: {
        type: Sequelize.INTEGER(10),
        refrences: {
          model: "user",
          key: "id",
        },
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
    await queryInterface.dropTable("ProductModels");
  },
};
