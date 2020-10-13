'use strict';
module.exports = (sequelize, DataTypes) => {
  const Child = sequelize.define('Child', {
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
  Child.associate = function (models) {
    // associations can be defined here
    Child.belongsTo(models.User, { foreignKey: 'userId' });
    Child.belongsToMany(models.Parent, {
      through: 'ChildParents',
      as: 'parents',
      foreignKey: 'childId'
    });
  };
  return Child;
};