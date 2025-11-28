const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./User');
const Recipe = require('./Recipe');

const Like = sequelize.define('Like', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  recipeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Recipes',
      key: 'id',
    },
  },
}, {
  indexes: [
    {
      unique: true,
      fields: ['userId', 'recipeId'],
    },
  ],
});

Like.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Like.belongsTo(Recipe, { foreignKey: 'recipeId', as: 'recipe' });

User.hasMany(Like, { foreignKey: 'userId', as: 'likes' });
Recipe.hasMany(Like, { foreignKey: 'recipeId', as: 'likes' });

module.exports = Like;
