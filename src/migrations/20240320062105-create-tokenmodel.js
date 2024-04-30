"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tokenModels", {
      id: {
        type: Sequelize.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER(10),
        require: true,
        allowNull: false,
        refrences: {
          model: "user",
          key: "id ",
        },
      },
      token: {
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
    await queryInterface.dropTable("tokenModels");
  },
};
