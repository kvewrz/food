const sequelize = require('../database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');
const Like = require('../models/Like');

const categories = [
  { name: 'Breakfast', description: 'Morning meals and breakfast dishes' },
  { name: 'Lunch', description: 'Midday meals and main dishes' },
  { name: 'Dinner', description: 'Evening meals and hearty dishes' },
  { name: 'Desserts', description: 'Sweet treats and desserts' },
  { name: 'Snacks', description: 'Quick bites and snacks' },
];

const recipes = [
  {
    name: 'Pancakes with Maple Syrup',
    cuisine: 'American',
    difficulty: 'Easy',
    cookingTime: '20 minutes',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93',
    category: 'Breakfast',
  },
  {
    name: 'Classic Caesar Salad',
    cuisine: 'Italian',
    difficulty: 'Easy',
    cookingTime: '15 minutes',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1',
    category: 'Lunch',
  },
  {
    name: 'Grilled Salmon with Vegetables',
    cuisine: 'Mediterranean',
    difficulty: 'Medium',
    cookingTime: '30 minutes',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288',
    category: 'Dinner',
  },
  {
    name: 'Chocolate Lava Cake',
    cuisine: 'French',
    difficulty: 'Hard',
    cookingTime: '25 minutes',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51',
    category: 'Desserts',
  },
  {
    name: 'Avocado Toast',
    cuisine: 'Modern',
    difficulty: 'Easy',
    cookingTime: '10 minutes',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d',
    category: 'Breakfast',
  },
  {
    name: 'Chicken Pasta Alfredo',
    cuisine: 'Italian',
    difficulty: 'Medium',
    cookingTime: '35 minutes',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
    category: 'Dinner',
  },
  {
    name: 'Fresh Fruit Smoothie Bowl',
    cuisine: 'Healthy',
    difficulty: 'Easy',
    cookingTime: '10 minutes',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733',
    category: 'Breakfast',
  },
  {
    name: 'Beef Tacos',
    cuisine: 'Mexican',
    difficulty: 'Easy',
    cookingTime: '25 minutes',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b',
    category: 'Lunch',
  },
  {
    name: 'Tiramisu',
    cuisine: 'Italian',
    difficulty: 'Medium',
    cookingTime: '40 minutes',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9',
    category: 'Desserts',
  },
  {
    name: 'Hummus with Pita Chips',
    cuisine: 'Middle Eastern',
    difficulty: 'Easy',
    cookingTime: '15 minutes',
    image: 'https://images.unsplash.com/photo-1575318634028-6a0cfcb60c59',
    category: 'Snacks',
  },
  {
    name: 'Beef Steak with Potato',
    cuisine: 'American',
    difficulty: 'Hard',
    cookingTime: '45 minutes',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462',
    category: 'Dinner',
  },
  {
    name: 'Mango Cheesecake',
    cuisine: 'Fusion',
    difficulty: 'Hard',
    cookingTime: '50 minutes',
    image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50',
    category: 'Desserts',
  },
];

async function seedDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log('✅ Database synchronized');

    const createdCategories = await Category.bulkCreate(categories);
    console.log(`✅ Created ${createdCategories.length} categories`);

    const categoryMap = {};
    createdCategories.forEach(cat => {
      categoryMap[cat.name] = cat.id;
    });

    const recipesWithCategoryIds = recipes.map(recipe => ({
      name: recipe.name,
      cuisine: recipe.cuisine,
      difficulty: recipe.difficulty,
      cookingTime: recipe.cookingTime,
      image: recipe.image,
      categoryId: categoryMap[recipe.category],
    }));

    await Recipe.bulkCreate(recipesWithCategoryIds);
    console.log(`✅ Created ${recipes.length} recipes`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('Users table is empty - use /auth/register to create users');
    console.log('Likes table is empty - users can like recipes after registration');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
