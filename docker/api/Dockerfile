#
# Frontend
#
FROM node:14 as frontend

RUN mkdir -p /api/public

WORKDIR /api

ADD api/artisan api/package.json api/yarn.lock api/webpack.mix.js api/tailwind.config.js /api/

RUN yarn install

ADD api/resources/css/ /api/resources/css/
ADD api/resources/js/ /api/resources/js/
ADD api/resources/views/ /api/resources/views/

RUN yarn production

#
# API
#
FROM php:7.4-fpm

# Install extensions
RUN apt-get update && apt-get install -y libcurl4-gnutls-dev libxml2-dev libzip-dev && apt-get autoremove -y
RUN docker-php-ext-install -j$(nproc) pdo_mysql zip
RUN pecl install redis \
	&& docker-php-ext-enable redis

# Create php user
RUN groupadd -g 1000 engels
RUN useradd -u 1000 -g 1000 engels

# Add custom php config
ADD docker/php/www.conf /usr/local/etc/php-fpm.d/www.conf

# Copy files
ADD api /api

COPY --from=frontend /api/public/css /api/public/css
COPY --from=frontend /api/public/fonts /api/public/fonts
COPY --from=frontend /api/public/js /api/public/js

WORKDIR /api

RUN mkdir -p /api/bootstrap/cache

# Install php dependencies
COPY --from=composer:2.0 /usr/bin/composer /usr/bin/composer
RUN composer install --no-ansi --no-dev --no-interaction --no-plugins --no-progress --no-scripts --optimize-autoloader --prefer-dist

# Adjust permissions
RUN chown -R engels:engels /api

USER engels

VOLUME /api/storage/framework
VOLUME /api/storage/logs

CMD /api/start.sh
