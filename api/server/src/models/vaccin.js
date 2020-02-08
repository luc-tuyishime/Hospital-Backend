'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vaccin = sequelize.define('Vaccin', {
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
    childId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Children',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    },
    updatedAt: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    }
  }, {});
  Vaccin.associate = function (models) {
    // associations can be defined here
    Vaccin.belongsTo(models.User, { foreignKey: 'userId' });
    Vaccin.belongsTo(models.Child, { foreignKey: 'childId' });
  };
  return Vaccin;
};