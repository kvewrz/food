const express = require('express');
const cors = require('cors');
const sequelize = require('./database');
require('dotenv').config();

// Controllers
const authController = require('./controllers/authController');
const recipesController = require('./controllers/recipesController');
const categoriesController = require('./controllers/categoriesController');
const likesController = require('./controllers/likesController');

// Middleware
const auth = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Синхронизация базы данных
sequelize.sync().then(() => {
  console.log('Database synchronized');
});

// ========== ROUTES ==========

// Root
app.get('/', (req, res) => {
  res.json({
    message: 'Food Recipes API',
    endpoints: {
      auth: {
        register: 'POST /auth/register',
        login: 'POST /auth/login',
        refresh: 'POST /auth/refresh',
        logout: 'POST /auth/logout (requires auth)',
      },
      recipes: 'GET /recipes, POST /recipes (auth), PUT /recipes/:id (auth), DELETE /recipes/:id (auth)',
      categories: 'GET /categories, POST /categories (auth)',
      likes: 'POST /likes (auth), DELETE /likes/:recipeId (auth), GET /likes/my (auth)',
    },
  });
});

// ========== AUTH ROUTES ==========
app.post('/auth/register', authController.register);
app.post('/auth/login', authController.login);
app.post('/auth/refresh', authController.refresh);
app.post('/auth/logout', auth, authController.logout);

// ========== RECIPES ROUTES ==========
app.get('/recipes', recipesController.getAllRecipes);
app.get('/recipes/:id', recipesController.getRecipeById);
app.post('/recipes', auth, recipesController.createRecipe);
app.put('/recipes/:id', auth, recipesController.updateRecipe);
app.delete('/recipes/:id', auth, recipesController.deleteRecipe);

// ========== CATEGORIES ROUTES ==========
app.get('/categories', categoriesController.getAllCategories);
app.get('/categories/:id', categoriesController.getCategoryById);
app.post('/categories', auth, categoriesController.createCategory);
app.put('/categories/:id', auth, categoriesController.updateCategory);
app.delete('/categories/:id', auth, categoriesController.deleteCategory);

// ========== LIKES ROUTES ==========
app.post('/likes', auth, likesController.likeRecipe);
app.delete('/likes/:recipeId', auth, likesController.unlikeRecipe);
app.get('/likes/my', auth, likesController.getMyLikes);
app.get('/recipes/:id/likes', likesController.getRecipeLikes);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🍽️  Food Recipes API is running on http://localhost:${PORT}`);
});
