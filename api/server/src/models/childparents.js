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
        model: 'Parent',
        key: 'id'
      }
    },
    childId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Child',
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
  ChildParents.associate = function (models) {
    // associations can be defined here
    ChildParents.belongsTo(models.Parent, {
      as: 'parents',
      foreignKey: "parentId"
    });

    ChildParents.belongsTo(models.Child, {
      as: 'children',
      foreignKey: "childId"
    });

  };
  return ChildParents;
};