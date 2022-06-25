'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Notebooks', [{
     title: 'Test First Notebook',
     userId: 1,
     createdAt: new Date(),
     updatedAt: new Date()
   }], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Notebooks', null, {});
  }
};
