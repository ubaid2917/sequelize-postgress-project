'use strict';
const bcrypt = require('bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    let password = process.env.USER_PASSWORD
    const hashPassword = bcrypt.hashSync(password, 10);
    return queryInterface.bulkInsert('user', [
      { 
        userType: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: process.env.USER_EMAIL,
        password: hashPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', { userType: '1' }, {});
  },
};