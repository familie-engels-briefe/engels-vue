#!/usr/bin/env bash

cd /api

php artisan config:cache
php artisan migrate --force

php-fpm
