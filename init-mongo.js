// MongoDB инициализация для Docker
db = db.getSiblingDB('alpaca_farm_db');

// Создание коллекций
db.createCollection('site_info');
db.createCollection('services');
db.createCollection('blog_posts');
db.createCollection('reviews');
db.createCollection('news');
db.createCollection('gallery');
db.createCollection('bookings');
db.createCollection('users');

// Создание индексов для производительности
db.services.createIndex({ "slug": 1 }, { unique: true });
db.blog_posts.createIndex({ "slug": 1 }, { unique: true });
db.users.createIndex({ "username": 1 }, { unique: true });
db.bookings.createIndex({ "created_at": -1 });
db.reviews.createIndex({ "is_approved": 1 });

print('MongoDB initialized successfully for Alpaca Farm!');