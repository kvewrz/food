const sequelize = require('../database');

async function createRecipesTable() {
  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255) NOT NULL,
      cuisine VARCHAR(255) NOT NULL,
      difficulty VARCHAR(255) NOT NULL,
      cookingTime VARCHAR(255) NOT NULL,
      image VARCHAR(255),
      categoryId INTEGER NOT NULL,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      FOREIGN KEY (categoryId) REFERENCES categories(id)
    );
  `);
  console.log('✅ Recipes table created');
}

async function runMigrations() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    await createRecipesTable();

    console.log('🎉 Migrations completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration error:', error);
    process.exit(1);
  }
}

runMigrations();
