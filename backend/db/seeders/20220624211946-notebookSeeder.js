'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Notebooks', [{
     title: 'Test First Notebook',
     userId: 10,
     createdAt: new Date(),
     updatedAt: new Date()
   }, {
    title: 'Test Second Notebook',
    userId: 10,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    title: 'Test Third Notebook',
    userId: 10,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Notebooks', null, {});
  }
};
