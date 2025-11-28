const Like = require('../models/Like');
const Recipe = require('../models/Recipe');

// POST /likes - Лайкнуть рецепт
exports.likeRecipe = async (req, res) => {
  try {
    const { recipeId } = req.body;
    const userId = req.user.id;

    if (!recipeId) {
      return res.status(400).json({ error: 'recipeId is required' });
    }

    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    const existingLike = await Like.findOne({
      where: { userId, recipeId },
    });

    if (existingLike) {
      return res.status(400).json({ error: 'You already liked this recipe' });
    }

    const like = await Like.create({ userId, recipeId });
    res.status(201).json({ message: 'Recipe liked successfully', like });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /likes/:recipeId - Убрать лайк
exports.unlikeRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const userId = req.user.id;

    const like = await Like.findOne({
      where: { userId, recipeId },
    });

    if (!like) {
      return res.status(404).json({ error: 'Like not found' });
    }

    await like.destroy();
    res.json({ message: 'Like removed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /likes/my - Получить лайкнутые рецепты текущего пользователя
exports.getMyLikes = async (req, res) => {
  try {
    const userId = req.user.id;

    const likes = await Like.findAll({
      where: { userId },
      include: [
        {
          model: Recipe,
          as: 'recipe',
          include: [
            {
              model: require('../models/Category'),
              as: 'category',
            },
          ],
        },
      ],
    });

    res.json(likes.map(like => like.recipe));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /recipes/:id/likes - Получить количество лайков рецепта
exports.getRecipeLikes = async (req, res) => {
  try {
    const recipeId = req.params.id;

    const likesCount = await Like.count({ where: { recipeId } });

    res.json({ recipeId, likesCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
