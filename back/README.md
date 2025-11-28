# Food Recipes REST API

REST API для поиска и управления рецептами с аутентификацией на Express.js, Sequelize и SQLite.

## 🚀 Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск миграций (создание таблиц)
node migrations/migrate.js

# Заполнение базы данных
node seeders/seed.js

# Запуск сервера
npm start

# Запуск в режиме разработки (с автоперезагрузкой)
npm run dev
```

Сервер запустится на http://localhost:3002

## 📚 API Endpoints

### Authentication

#### Регистрация
```http
POST /auth/register
Content-Type: application/json

{
  "username": "chef",
  "email": "chef@food.com",
  "password": "tasty123"
}
```

#### Вход
```http
POST /auth/login
Content-Type: application/json

{
  "email": "chef@food.com",
  "password": "tasty123"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "chef",
    "email": "chef@food.com"
  }
}
```

#### Обновление токена
```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Выход
```http
POST /auth/logout
Authorization: Bearer <accessToken>
```

---

### Recipes

#### Получить все рецепты
```http
GET /recipes
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Pancakes with Maple Syrup",
    "cuisine": "American",
    "difficulty": "Easy",
    "cookingTime": "20 minutes",
    "image": "https://...",
    "categoryId": 1,
    "category": {
      "id": 1,
      "name": "Breakfast"
    }
  }
]
```

#### Получить рецепт по ID
```http
GET /recipes/1
```

#### Создать рецепт (требуется авторизация)
```http
POST /recipes
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "name": "Scrambled Eggs",
  "cuisine": "American",
  "difficulty": "Easy",
  "cookingTime": "10 minutes",
  "image": "https://...",
  "categoryId": 1
}
```

#### Обновить рецепт (требуется авторизация)
```http
PUT /recipes/1
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "name": "Fluffy Pancakes",
  "difficulty": "Medium",
  "cookingTime": "25 minutes"
}
```

#### Удалить рецепт (требуется авторизация)
```http
DELETE /recipes/1
Authorization: Bearer <accessToken>
```

---

### Categories

#### Получить все категории
```http
GET /categories
```

#### Получить категорию с рецептами
```http
GET /categories/1
```

**Response:**
```json
{
  "id": 1,
  "name": "Breakfast",
  "description": "Morning meals and breakfast dishes",
  "recipes": [
    {
      "id": 1,
      "name": "Pancakes with Maple Syrup",
      "cuisine": "American",
      "difficulty": "Easy",
      "cookingTime": "20 minutes"
    }
  ]
}
```

#### Создать категорию (требуется авторизация)
```http
POST /categories
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "name": "Beverages",
  "description": "Drinks and beverages"
}
```

#### Обновить категорию (требуется авторизация)
```http
PUT /categories/1
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "name": "Morning Meals",
  "description": "Delicious breakfast dishes"
}
```

#### Удалить категорию (требуется авторизация)
```http
DELETE /categories/1
Authorization: Bearer <accessToken>
```

---

### Likes (Избранное)

#### Лайкнуть рецепт (требуется авторизация)
```http
POST /likes
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "recipeId": 1
}
```

#### Убрать лайк (требуется авторизация)
```http
DELETE /likes/1
Authorization: Bearer <accessToken>
```

#### Получить мои избранные рецепты (требуется авторизация)
```http
GET /likes/my
Authorization: Bearer <accessToken>
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Pancakes with Maple Syrup",
    "cuisine": "American",
    "difficulty": "Easy",
    "cookingTime": "20 minutes",
    "image": "https://...",
    "category": {
      "id": 1,
      "name": "Breakfast"
    }
  }
]
```

#### Получить количество лайков рецепта
```http
GET /recipes/1/likes
```

**Response:**
```json
{
  "recipeId": 1,
  "likesCount": 15
}
```

---

## 🔐 Аутентификация

Для защищенных маршрутов требуется JWT токен в заголовке:

```
Authorization: Bearer <accessToken>
```

Access токен действителен 1 час, refresh токен - 7 дней.

## 🗄️ База данных

- **Categories** - категории рецептов (Breakfast, Lunch, Dinner, Desserts, Snacks)
- **Recipes** - рецепты с информацией о кухне, сложности, времени приготовления
- **Users** - пользователи системы
- **Likes** - связь между пользователями и избранными рецептами

## 📦 Начальные данные

После запуска `seed.js` будут созданы:
- 5 категорий (Breakfast, Lunch, Dinner, Desserts, Snacks)
- 12 рецептов (Pancakes, Caesar Salad, Grilled Salmon, Chocolate Lava Cake, и др.)
- Пустая таблица пользователей (создайте через `/auth/register`)
- Пустая таблица лайков

## 🛠️ Технологии

- Express.js 4.18.2
- Sequelize 6.35.0
- SQLite3 5.1.6
- JWT (jsonwebtoken 9.0.2)
- bcrypt 5.1.1
- CORS 2.8.5

## 🍳 Примеры полей рецептов

- **name** - название рецепта
- **cuisine** - кухня (American, Italian, Mexican, Mediterranean, etc.)
- **difficulty** - сложность (Easy, Medium, Hard)
- **cookingTime** - время приготовления (10 minutes, 30 minutes, etc.)
- **image** - URL изображения блюда
- **categoryId** - ID категории
