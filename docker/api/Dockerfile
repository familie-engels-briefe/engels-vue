FROM php:7.4-fpm

# Install extensions
RUN apt-get update && apt-get install -y libcurl4-gnutls-dev libxml2-dev && apt-get autoremove -y
RUN docker-php-ext-install -j$(nproc) pdo_mysql
RUN pecl install redis \
	&& docker-php-ext-enable redis

# Create php user
RUN groupadd -g 1000 engels
RUN useradd -u 1000 -g 1000 engels

# Add custom php config
ADD docker/php/www.conf /usr/local/etc/php-fpm.d/www.conf

# Create volumes
RUN mkdir -p /api/storage/logs && \
    mkdir -p /api/storage/framework/cache && \
    mkdir -p /api/storage/framework/sessions && \
    mkdir -p /api/storage/framework/testing && \
    mkdir -p /api/storage/framework/views && \
    mkdir -p /home/engels/.config/psysh && \
    chown -R engels:engels /api && \
    chown -R engels:engels /home/engels/.config/psysh

WORKDIR /api

USER engels

VOLUME /api/storage/framework
VOLUME /api/storage/logs

CMD php-fpm
