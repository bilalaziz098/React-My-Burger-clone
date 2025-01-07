'use strict';



module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  Users.associate = function(models) {
    Users.hasMany(models.Orders, {
      foreignKey: 'user_id',  
      onDelete: 'CASCADE',  
    });
  };

  return Users;
};