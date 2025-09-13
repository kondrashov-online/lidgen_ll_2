#!/bin/bash
set -e

DOMAIN="парк-альпака.рф"
EMAIL="admin@парк-альпака.рф"  # Замените на ваш email

echo "🔒 Настройка SSL для $DOMAIN"
echo "============================="

# Создание директории для SSL
mkdir -p ./ssl

# Проверка, что сайт доступен по HTTP
echo "🔍 Проверка доступности сайта..."
if ! curl -f http://$DOMAIN >/dev/null 2>&1; then
    echo "❌ Сайт недоступен по HTTP. Убедитесь, что:"
    echo "   1. DNS записи настроены на ваш сервер"
    echo "   2. Сайт запущен и доступен по HTTP"
    echo "   3. Порт 80 открыт в firewall"
    exit 1
fi

echo "✅ Сайт доступен, продолжаем..."

# Установка Certbot если не установлен
if ! command -v certbot &> /dev/null; then
    echo "📦 Установка Certbot..."
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Ubuntu/Debian
        apt-get update
        apt-get install -y certbot
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew install certbot
    else
        echo "❌ Автоматическая установка Certbot не поддерживается для вашей ОС"
        echo "Установите Certbot вручную: https://certbot.eff.org/"
        exit 1
    fi
fi

# Остановка Nginx для получения сертификата
echo "🛑 Временная остановка веб-сервера..."
docker-compose stop frontend

# Получение сертификата
echo "📜 Получение SSL сертификата..."
certbot certonly \
    --standalone \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    --domains $DOMAIN,www.$DOMAIN

# Копирование сертификатов
echo "📋 Копирование сертификатов..."
cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem ./ssl/
cp /etc/letsencrypt/live/$DOMAIN/privkey.pem ./ssl/

# Установка правильных прав
chmod 644 ./ssl/fullchain.pem
chmod 600 ./ssl/privkey.pem

# Запуск с SSL
echo "🚀 Перезапуск с SSL..."
docker-compose up -d frontend

# Проверка HTTPS
sleep 10
if curl -f https://$DOMAIN >/dev/null 2>&1; then
    echo "✅ SSL настроен успешно!"
    echo "🔒 Сайт доступен по HTTPS: https://$DOMAIN"
else
    echo "❌ Ошибка настройки SSL. Проверьте логи:"
    echo "docker-compose logs frontend"
fi

# Настройка автообновления
echo "🔄 Настройка автообновления сертификатов..."
(crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet --deploy-hook 'cd $(pwd) && docker-compose restart frontend'") | crontab -

echo ""
echo "🎉 SSL настройка завершена!"
echo "🔒 Ваш сайт теперь доступен по HTTPS"
echo "🔄 Сертификаты будут автоматически обновляться"