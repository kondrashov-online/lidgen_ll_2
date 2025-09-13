# Contracts - Backend Integration Plan для Альпака Ферма ЛуЛу

## API Контракты

### 1. Контакты и информация о ферме
```
GET /api/site-info
Возвращает: базовую информацию о ферме (название, адрес, телефон, email, описание)
```

### 2. Услуги
```
GET /api/services
Возвращает: список всех услуг с описаниями, ценами и изображениями

GET /api/services/:id
Возвращает: детальную информацию об услуге

POST /api/services (admin)
Создает: новую услугу

PUT /api/services/:id (admin)  
Обновляет: существующую услугу

DELETE /api/services/:id (admin)
Удаляет: услугу
```

### 3. Блог
```
GET /api/blog/posts
Возвращает: список всех статей блога с пагинацией

GET /api/blog/posts/:slug
Возвращает: полную статью по slug

POST /api/blog/posts (admin)
Создает: новую статью

PUT /api/blog/posts/:id (admin)
Обновляет: существующую статью

DELETE /api/blog/posts/:id (admin)
Удаляет: статью
```

### 4. Отзывы
```
GET /api/reviews
Возвращает: список одобренных отзывов

POST /api/reviews
Создает: новый отзыв (требует модерации)

PUT /api/reviews/:id/approve (admin)
Одобряет: отзыв для публикации

DELETE /api/reviews/:id (admin)
Удаляет: отзыв
```

### 5. Новости
```
GET /api/news
Возвращает: список новостей

POST /api/news (admin)
Создает: новую новость

PUT /api/news/:id (admin)
Обновляет: новость

DELETE /api/news/:id (admin)
Удаляет: новость
```

### 6. Галерея
```
GET /api/gallery
Возвращает: список изображений галереи

POST /api/gallery (admin)
Добавляет: новое изображение

DELETE /api/gallery/:id (admin)
Удаляет: изображение из галереи
```

### 7. Бронирования
```
POST /api/bookings
Создает: новую заявку на бронирование

GET /api/bookings (admin)
Возвращает: список всех заявок

PUT /api/bookings/:id/status (admin)
Обновляет: статус заявки (новая, обработана, завершена)
```

### 8. Аутентификация (Админ)
```
POST /api/auth/login
Авторизует: администратора

POST /api/auth/logout
Разавторизует: администратора

GET /api/auth/me
Возвращает: информацию о текущем пользователе
```

## Замена Mock Data

### Файлы для изменения:
1. **mock.js** - полностью заменить на API вызовы
2. **Header.jsx** - динамическая загрузка меню и контактов
3. **HeroSection.jsx** - загрузка информации о ферме из API
4. **ActivitiesSection.jsx** - загрузка услуг из API
5. **PhotoGallery.jsx** - загрузка изображений из API
6. **ReviewsSection.jsx** - загрузка отзывов из API
7. **NewsSection.jsx** - загрузка новостей из API
8. **ContactForm.jsx** - отправка заявок через API

### Mock данные для замены:
- `siteInfo` → `GET /api/site-info`
- `navigationMenu` → `GET /api/site-info` (часть меню)
- `activities` → `GET /api/services`
- `galleryImages` → `GET /api/gallery`
- `reviews` → `GET /api/reviews`
- `news` → `GET /api/news`
- `services` → `GET /api/services`
- `blogPosts` → `GET /api/blog/posts`

## Backend Implementation

### MongoDB Models:
1. **SiteInfo** - информация о ферме
2. **Service** - услуги
3. **BlogPost** - статьи блога
4. **Review** - отзывы посетителей
5. **News** - новости фермы
6. **Gallery** - изображения галереи
7. **Booking** - заявки на бронирование
8. **User** - администраторы

### Дополнительные функции:
1. **Загрузка файлов** для изображений
2. **Email уведомления** для новых заявок
3. **Модерация отзывов**
4. **SEO метаданные** для страниц
5. **Sitemap генерация**

## Frontend-Backend Integration

### Этапы интеграции:
1. Создать API endpoints в backend
2. Создать сервис для HTTP запросов в frontend
3. Заменить mock данные на API вызовы
4. Добавить loading states и error handling
5. Создать админ-панель
6. Добавить аутентификацию

### SEO Optimization:
1. **Structured Data (микроразметка)**:
   - LocalBusiness для фермы
   - Product для услуг
   - Article для блога
   - Review для отзывов
   - BreadcrumbList для навигации

2. **Meta теги**:
   - Динамические title и description
   - Open Graph для соц сетей
   - Canonical URLs

3. **Sitemap**:
   - Автоматическая генерация sitemap.xml
   - Robots.txt

## Admin Panel Features

### Основной функционал:
1. **Dashboard** - статистика заявок и посещений
2. **Управление услугами** - CRUD операции
3. **Управление блогом** - редактор статей
4. **Модерация отзывов** - одобрение/отклонение
5. **Управление новостями** - CRUD операции
6. **Управление галереей** - загрузка изображений
7. **Заявки** - просмотр и обработка бронирований
8. **Настройки сайта** - редактирование контактов

### Технические детали:
- Защищенные роуты для админов
- JWT токены для аутентификации
- Роль-based доступ
- Загрузка и оптимизация изображений
- WYSIWYG редактор для контента