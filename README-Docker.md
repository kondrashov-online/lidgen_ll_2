# 🦙 Парк Альпака - Docker Развертывание

Полное руководство по развертыванию сайта **парк-альпака.рф** с помощью Docker.

## 🚀 Быстрый старт

```bash
# 1. Клонирование репозитория
git clone YOUR_REPOSITORY_URL
cd alpaca-farm

# 2. Развертывание
chmod +x deploy.sh
./deploy.sh

# 3. Настройка SSL (после настройки DNS)
chmod +x ssl-setup.sh
./ssl-setup.sh
```

## 📋 Требования

- **Docker** 20.10+
- **Docker Compose** 2.0+
- **Домен** парк-альпака.рф с настроенными DNS записями
- **Порты**: 80, 443, 8001, 27017

## 🏗️ Архитектура

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Nginx Proxy   │───▶│   React App      │    │   FastAPI       │
│   (Frontend)    │    │   (Frontend)     │◀──▶│   (Backend)     │
│   Port 80/443   │    │   Port 80        │    │   Port 8001     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                        │
                                                        ▼
                                               ┌─────────────────┐
                                               │   MongoDB       │
                                               │   Port 27017    │
                                               └─────────────────┘
```

## 🔧 Сервисы

### Frontend (React + Nginx)
- **Контейнер**: `alpaca_frontend`
- **Порты**: 80 (HTTP), 443 (HTTPS)
- **Функции**: React приложение, SSL терминация, проксирование API

### Backend (FastAPI)
- **Контейнер**: `alpaca_backend`
- **Порт**: 8001
- **Функции**: REST API, аутентификация, бизнес-логика

### База данных (MongoDB)
- **Контейнер**: `alpaca_mongodb`
- **Порт**: 27017
- **Функции**: Хранение данных, индексы

## 📝 Управление

### Основные команды
```bash
# Запуск всех сервисов
docker-compose up -d

# Просмотр логов
docker-compose logs -f

# Остановка
docker-compose down

# Перезапуск конкретного сервиса
docker-compose restart backend

# Обновление (пересборка образов)
docker-compose up -d --build

# Очистка (удаление всех данных)
docker-compose down -v
```

### Мониторинг
```bash
# Статус сервисов
docker-compose ps

# Использование ресурсов
docker stats

# Здоровье сервисов
docker-compose exec backend curl -f http://localhost:8001/api/
docker-compose exec frontend curl -f http://localhost/
```

## 🔒 SSL/HTTPS

### Автоматическая настройка
```bash
./ssl-setup.sh
```

### Ручная настройка
```bash
# 1. Получение сертификата
certbot certonly --standalone -d парк-альпака.рф -d www.парк-альпака.рф

# 2. Копирование сертификатов
cp /etc/letsencrypt/live/парк-альпака.рф/fullchain.pem ./ssl/
cp /etc/letsencrypt/live/парк-альпака.рф/privkey.pem ./ssl/

# 3. Перезапуск
docker-compose restart frontend
```

## 🗄️ База данных

### Бэкап
```bash
# Создание бэкапа
docker-compose exec mongodb mongodump --db alpaca_farm_db --out /data/backup

# Копирование бэкапа на хост
docker cp alpaca_mongodb:/data/backup ./backup-$(date +%Y%m%d)
```

### Восстановление
```bash
# Копирование бэкапа в контейнер
docker cp ./backup alpaca_mongodb:/data/restore

# Восстановление
docker-compose exec mongodb mongorestore /data/restore/alpaca_farm_db
```

### Прямое подключение
```bash
# Подключение к MongoDB
docker-compose exec mongodb mongo alpaca_farm_db

# Просмотр коллекций
db.getCollectionNames()

# Статистика
db.stats()
```

## 🚨 Устранение проблем

### Backend не запускается
```bash
# Проверка логов
docker-compose logs backend

# Проверка подключения к БД
docker-compose exec backend python -c "from database import connect_to_mongo; import asyncio; asyncio.run(connect_to_mongo())"
```

### Frontend недоступен
```bash
# Проверка конфигурации Nginx
docker-compose exec frontend nginx -t

# Просмотр логов Nginx
docker-compose logs frontend
```

### Проблемы с SSL
```bash
# Проверка сертификатов
openssl x509 -in ./ssl/fullchain.pem -text -noout

# Тест SSL соединения
openssl s_client -connect парк-альпака.рф:443 -servername парк-альпака.рф
```

### Проблемы с MongoDB
```bash
# Проверка подключения
docker-compose exec mongodb mongo --eval "db.adminCommand('ismaster')"

# Проверка дискового пространства
docker-compose exec mongodb df -h
```

## 🔧 Конфигурация

### Переменные окружения

**Backend (.env)**:
```env
MONGO_URL=mongodb://mongodb:27017
DB_NAME=alpaca_farm_db
SECRET_KEY=your-production-secret-key
CORS_ORIGINS=https://парк-альпака.рф
```

**Frontend (.env.production)**:
```env
REACT_APP_BACKEND_URL=https://парк-альпака.рф
GENERATE_SOURCEMAP=false
```

### Масштабирование
```yaml
# docker-compose.override.yml для продакшн
version: '3.8'
services:
  backend:
    deploy:
      replicas: 3
      resources:
        limits:
          memory: 512M
        reservations:
          memory: 256M
  
  mongodb:
    deploy:
      resources:
        limits:
          memory: 1G
        reservations:
          memory: 512M
```

## 📊 Мониторинг производительности

### Установка мониторинга
```bash
# Добавить в docker-compose.yml
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
  
  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"
```

## 🔄 Автообновление

### GitHub Actions деплой
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to server
        run: |
          ssh user@server "cd /var/www && git pull && ./deploy.sh"
```

## 📞 Поддержка

При возникновении проблем:

1. **Проверьте логи**: `docker-compose logs -f`
2. **Проверьте статус**: `docker-compose ps`
3. **Проверьте ресурсы**: `docker stats`
4. **Перезапустите проблемный сервис**: `docker-compose restart SERVICE_NAME`

---

**🦙 Парк Альпака - Развертывание завершено!**