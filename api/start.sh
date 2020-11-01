#!/usr/bin/env bash

cd /api

cat .env

php artisan config:cache
php artisan migrate --force

php-fpm
