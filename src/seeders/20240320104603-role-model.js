"use strict";

const db = require("../models/index");
const Role = db.rolemodels;
const roleData = require("../data/roleData");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "rolemodels",
      [
        {
          roleName: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleName: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleName: "seller",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("rolemodels", null, {});
  },
};
