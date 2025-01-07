'use strict';
module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define('Orders', {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
      allowNull: false,
    },
    salad: {
      type: DataTypes.INTEGER,
      allowNull: true, 
    },
    meat: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bacon: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cheese: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,  
      references: {
        model: 'Users',
        key: 'id', 
      },
    }
  });

  Orders.associate = function(models) {
    Orders.belongsTo(models.Users,{
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    })
  };

  return Orders;
};