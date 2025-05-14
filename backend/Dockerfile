FROM php:8.2-fpm-alpine

# Variables Composer
ENV COMPOSER_ALLOW_SUPERUSER=1 \
    COMPOSER_MEMORY_LIMIT=-1

RUN apk update \
 && apk add --no-cache \
      # Bibliotecas de runtime
      libpng \
      freetype \
      libjpeg-turbo \
      icu-libs \
      libxml2 \
      libzip \
      oniguruma \
      mariadb-dev \
      curl \
      git \
      unzip \
 \
      # Librerías de desarrollo
      libpng-dev \
      freetype-dev \
      libjpeg-turbo-dev \
      icu-dev \
      libxml2-dev \
      libzip-dev \
      oniguruma-dev \
# Configura gd
 && docker-php-ext-configure gd \
      --with-freetype=/usr/include/ \
      --with-jpeg=/usr/include/ \
# Compila e instala las extensiones de PHP
 && docker-php-ext-install \
      pdo_mysql pdo mbstring exif pcntl bcmath gd zip xml intl \
# Limpia sólo las librerías de desarrollo
 && apk del \
      libpng-dev freetype-dev libjpeg-turbo-dev \
      icu-dev libxml2-dev libzip-dev \
      oniguruma-dev \
# Limpia caché de apk
 && rm -rf /var/cache/apk/*

WORKDIR /var/www

# Copia composer desde la imagen oficial
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copia el proyecto
COPY . .

# Instala dependencias de Laravel
RUN composer install --no-interaction --prefer-dist --optimize-autoloader \
 && chown -R www-data:www-data /var/www \
 && chmod -R 755 /var/www/storage

EXPOSE 9000
CMD ["php-fpm"]
