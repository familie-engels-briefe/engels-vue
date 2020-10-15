FROM php:7.4-fpm

MAINTAINER Tim Helfensdörfer <thelfensdrfer@gmail.com>

# Install extensions
RUN apt-get update && apt-get install \
    libpng-dev \
    libzip-dev zip \
    libmagickwand-dev \
    libcurl4-openssl-dev pkg-config libssl-dev -y
RUN docker-php-ext-install -j$(nproc) mysqli zip curl gd exif
RUN pecl install imagick
RUN docker-php-ext-enable imagick

# Install wp-cli
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && \
    mv wp-cli.phar /usr/local/bin/wp-cli && \
    chmod +x /usr/local/bin/wp-cli
RUN apt-get update && apt-get install less

RUN mkdir -p /app

WORKDIR /app

CMD ["php-fpm"]
