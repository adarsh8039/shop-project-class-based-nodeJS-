"use strict";

/** @type {import('sequelize-cli').Migration} */
const db = require("../models/index");
const UserModel = db.UserModel;

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
      "UserModel",
      [
        {
          fullName: "Adarsh",
          address: "Keshav nagar",
          street: "godadara",
          landmark: "godadara naher",
          city: "surat",
          pincode: "395010",
          state: "Gujarat",
          country: "India",
          mobile: "8154080303",
          email: "adarshdubey8039@gmail.com",
          password:
            "$2b$10$rnoIwW5mzHYyaktHTUOkCOwvqW/Vnxyq0ZGtHMZx4cjZ.NmXhfvNK",
          createdAt: new Date(),
          updatedAt: new Date(),
          // isBetaMember: false,
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
    await queryInterface.bulkDelete("UserModel", null, {});
  },
};
