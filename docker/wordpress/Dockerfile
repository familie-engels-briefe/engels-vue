FROM php:7.4-fpm

MAINTAINER Tim Helfensdörfer <thelfensdrfer@gmail.com>

# Install extensions
RUN apt-get update && apt-get install \
    libpng-dev \
    libzip-dev zip \
    libmagickwand-dev \
    libcurl4-openssl-dev pkg-config libssl-dev -y
RUN docker-php-ext-install -j$(nproc) mysqli zip curl gd exif

# Create php user
RUN groupadd -g 1000 engels
RUN useradd -u 1000 -g 1000 engels

# Add custom php config
ADD docker/php/www.conf /usr/local/etc/php-fpm.d/www.conf

# Install wp-cli
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && \
    mv wp-cli.phar /usr/local/bin/wp-cli && \
    chmod +x /usr/local/bin/wp-cli
RUN apt-get update && apt-get install less

# Create volume
RUN mkdir -p /wordpress/wp-content && \
    chown -R engels:engels /wordpress

WORKDIR /wordpress

USER engels

VOLUME /wordpress/wp-content/uploads

CMD ["php-fpm"]
