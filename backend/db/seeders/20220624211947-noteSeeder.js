'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Notes', [{
      title: 'First Test Note',
      content: 'This is the very first test note!',
      userId: 10,
      notebookId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Second Test Note',
      content: 'This is the second test note!',
      userId: 10,
      notebookId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Third Test Note',
      content: 'This is the third test note!',
      userId: 1,
      notebookId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Notes', null, {});
  }
};
