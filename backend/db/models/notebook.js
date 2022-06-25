'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define('Notebook', {
    title: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {});
  Notebook.associate = function(models) {
    Notebook.belongsTo(models.User, {foreignKey: 'userId'});
    Notebook.hasMany(models.Note, {foreignKey: 'notebookId'})
  };
  return Notebook;
};
