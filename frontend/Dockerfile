# Multi-stage build для React
FROM node:18-alpine as build

# Установка рабочей директории
WORKDIR /app

# Копирование package.json и yarn.lock
COPY package*.json yarn.lock ./

# Установка зависимостей
RUN yarn install --frozen-lockfile

# Аргумент для backend URL
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

# Копирование исходного кода
COPY . .

# Сборка приложения
RUN yarn build

# Production стадия с Nginx
FROM nginx:alpine

# Установка дополнительных пакетов
RUN apk add --no-cache curl

# Копирование собранного приложения
COPY --from=build /app/build /usr/share/nginx/html

# Копирование конфигурации Nginx (будет смонтирована как volume)
# COPY nginx.conf /etc/nginx/nginx.conf

# Создание директории для SSL
RUN mkdir -p /etc/nginx/ssl

# Открытие портов
EXPOSE 80 443

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]