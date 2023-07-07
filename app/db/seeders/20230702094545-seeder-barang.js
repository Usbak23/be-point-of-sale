"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Barangs",
      [
        {
          merk: "Pulpen",
          user: 1,
          category: 1,
          image: "/uploads/image 1.jpg",
          stock:100,
          price: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          merk: "Fanta",
          user: 1,
          category: 1,
          image: "/uploads/image 2.jpg",
          stock:100,
          price: 100,
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
  },
};
