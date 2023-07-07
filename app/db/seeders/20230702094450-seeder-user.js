'use strict';
const bcrypt = require ('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const password = bcrypt.hashSync('rahasia', 10)
    await queryInterface.bulkInsert('Users',
      [
        {
          name: 'Rizki',
          email: 'admin@gmail.com',
          password: password,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Ical',
          email: 'kasir@gmail.com',
          password: password,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]
      , {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
