"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SubCategoryModels", {
      id: {
        type: Sequelize.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
      },
      subCategoryName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      categoryId: {
        type: Sequelize.INTEGER(10),
        refrences: {
          model: "category", // table name
          key: "id", // same column name in other table
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
    await queryInterface.dropTable("SubCategoryModels");
  },
};
