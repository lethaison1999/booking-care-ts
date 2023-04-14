'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'admin@gmail.com',
        password: 123456,
        firstName: 'Le Thai',
        lastName: 'Son',
        address: 'VN',
        gender: 1,
        roleId: 'R1',
        phonenumber: '0379046120',
        image: 'image',
        positionId: 'positionId',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
