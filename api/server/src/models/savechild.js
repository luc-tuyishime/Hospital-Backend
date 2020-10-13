'use strict';
module.exports = (sequelize, DataTypes) => {
  const SaveChild = sequelize.define('SaveChild', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birth: {
      type: DataTypes.DATE,
      allowNull: false
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  SaveChild.associate = function (models) {
    // associations can be defined here
  };
  return SaveChild;
};