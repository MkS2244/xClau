FROM php:8.2-fpm-alpine

# Variables Composer
ENV COMPOSER_ALLOW_SUPERUSER=1 \
    COMPOSER_MEMORY_LIMIT=-1

RUN apk update \
 && apk add --no-cache \
      ## bibliotecas de runtime (necesarias para cargar las extensiones)
      libpng \
      freetype \
      libjpeg-turbo \
      icu-libs \
      libxml2 \
      libzip \
      postgresql-libs \
      oniguruma \
      curl \
      git \
      unzip \
 \
      ## libs + headers para compilar extensiones
      libpng-dev \
      freetype-dev \
      libjpeg-turbo-dev \
      icu-dev \
      libxml2-dev \
      libzip-dev \
      postgresql-dev \
      oniguruma-dev \
# Configura gd
 && docker-php-ext-configure gd \
      --with-freetype=/usr/include/ \
      --with-jpeg=/usr/include/ \
# Compila e instala las extensiones
 && docker-php-ext-install \
      pdo_pgsql pdo mbstring exif pcntl bcmath gd zip xml intl \
# Limpia sólo los headers y libs de desarrollo
 && apk del \
      libpng-dev freetype-dev libjpeg-turbo-dev \
      icu-dev libxml2-dev libzip-dev \
      postgresql-dev oniguruma-dev \
# Limpia cache apk
 && rm -rf /var/cache/apk/*

WORKDIR /var/www

# Trae composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY . .

RUN composer install --no-interaction --prefer-dist --optimize-autoloader \
 && chown -R www-data:www-data /var/www \
 && chmod -R 755 /var/www/storage

EXPOSE 9000
CMD ["php-fpm"]