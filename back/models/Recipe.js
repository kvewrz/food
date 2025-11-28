const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Category = require('./Category');

const Recipe = sequelize.define('Recipe', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cuisine: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  difficulty: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cookingTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Categories',
      key: 'id',
    },
  },
});

Recipe.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Recipe, { foreignKey: 'categoryId', as: 'recipes' });

module.exports = Recipe;
