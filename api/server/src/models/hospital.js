'use strict';
module.exports = (sequelize, DataTypes) => {
  const Hospital = sequelize.define('Hospital', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  Hospital.associate = (models) => {
    // associations can be defined here
    Hospital.hasMany(models.User, {
      foreignKey: 'hospitalId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return Hospital;
};