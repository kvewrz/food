const Recipe = require('../models/Recipe');
const Category = require('../models/Category');

// GET /recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll({
      include: [
        {
          model: Category,
          as: 'category',
        },
      ],
    });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /recipes/:id
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          as: 'category',
        },
      ],
    });

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /recipes
exports.createRecipe = async (req, res) => {
  try {
    const { name, cuisine, difficulty, cookingTime, image, categoryId } = req.body;

    if (!name || !cuisine || !difficulty || !cookingTime || !categoryId) {
      return res.status(400).json({ 
        error: 'name, cuisine, difficulty, cookingTime, and categoryId are required' 
      });
    }

    const recipe = await Recipe.create({
      name,
      cuisine,
      difficulty,
      cookingTime,
      image,
      categoryId,
    });

    const recipeWithCategory = await Recipe.findByPk(recipe.id, {
      include: [{ model: Category, as: 'category' }],
    });

    res.status(201).json(recipeWithCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT /recipes/:id
exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    await recipe.update(req.body);

    const updatedRecipe = await Recipe.findByPk(recipe.id, {
      include: [{ model: Category, as: 'category' }],
    });

    res.json(updatedRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE /recipes/:id
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    await recipe.destroy();
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
