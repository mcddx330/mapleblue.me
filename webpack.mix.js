const mix = require('laravel-mix');
require('laravel-mix-jigsaw');

mix.disableSuccessNotifications();
mix.setPublicPath('source/assets/build');

mix.jigsaw()
    .js('source/_assets/js/main.js', 'js')
    .css('source/_assets/css/main.css', 'css')
    .sass('source/_assets/sass/style.scss', 'source/assets/build/css/style.css')
    .copy('source/_assets/fonts', 'source/assets/build/fonts')
    .options({
        processCssUrls: false,
    })
    .version();
