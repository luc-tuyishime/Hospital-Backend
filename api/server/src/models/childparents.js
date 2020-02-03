'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChildParents = sequelize.define('ChildParents', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Parents',
        key: 'id'
      }
    },
    childId: {
      type: Datatypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Childs',
        key: 'id'
      }
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

  return ChildParents;
};