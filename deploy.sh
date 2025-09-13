#!/bin/bash
set -e

echo "🦙 Развертывание парк-альпака.рф"
echo "=================================="

# Проверка требований
command -v docker >/dev/null 2>&1 || { echo "❌ Docker не установлен. Установите Docker сначала."; exit 1; }
command -v docker-compose >/dev/null 2>&1 || { echo "❌ Docker Compose не установлен. Установите Docker Compose сначала."; exit 1; }

# Остановка существующих контейнеров
echo "🛑 Остановка существующих сервисов..."
docker-compose down || true

# Сборка и запуск
echo "🔨 Сборка Docker образов..."
docker-compose build --no-cache

echo "🚀 Запуск сервисов..."
docker-compose up -d

# Ожидание запуска MongoDB
echo "⏳ Ожидание запуска MongoDB..."
sleep 30

# Заполнение базы данными
echo "📊 Заполнение базы данных..."
docker-compose exec backend python seed_data.py || echo "ℹ️ Seed data уже загружен или файл не найден"

# Проверка статуса
echo "✅ Проверка статуса сервисов..."
docker-compose ps

# Проверка здоровья
echo "🔍 Проверка работоспособности..."
sleep 10

if curl -f http://localhost/api/ >/dev/null 2>&1; then
    echo "✅ Backend работает корректно"
else
    echo "❌ Backend не отвечает"
fi

if curl -f http://localhost >/dev/null 2>&1; then
    echo "✅ Frontend работает корректно"
else
    echo "❌ Frontend не отвечает"
fi

echo ""
echo "🎉 Развертывание завершено!"
echo "🌐 Сайт доступен по адресу: http://парк-альпака.рф"
echo "🔧 Админ-панель: http://парк-альпака.рф/admin/login"
echo "👤 Логин: admin, Пароль: admin123"
echo ""
echo "📋 Управление:"
echo "  Просмотр логов: docker-compose logs -f"
echo "  Остановка:      docker-compose down"
echo "  Перезапуск:     docker-compose restart"