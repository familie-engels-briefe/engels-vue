const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
if (mix.inProduction()) {
    console.log('Compiling for production...');

    mix.setResourceRoot('/api');
}

mix.js('resources/js/app.js', 'public/js')
    mix.postCss('resources/css/main.css', 'public/css', [
        require('tailwindcss'),
    ]);
