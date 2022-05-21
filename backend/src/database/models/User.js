const {DataTypes} = require('sequelize');

const Attributes = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthday: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

module.exports = (sequelize) => {
  const User = sequelize.define('users', Attributes, {
    timestamps: false,
    tableName: 'users',
  });
  User.associate = (models) => {
    User.hasMany(models.sales, { as: 'user', foreignkey: 'user_id' });
  };
  return User;
};