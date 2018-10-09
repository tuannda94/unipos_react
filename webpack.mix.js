const mix = require('laravel-mix');

mix.react('src/index.js', 'public/js/popup/app.js')
    .react('src/content.js', 'public/js/content/app.js')
    .js('src/background.js', 'public/js/background.js')
    .copy('popup.html', 'public/popup.html')
    .setPublicPath('public');

    mix.webpackConfig({
    resolve: {
        alias: {
            src: path.resolve(__dirname, './src'),
            Services: path.resolve(__dirname, './src/services'),
            Components: path.resolve(__dirname, './src/components'),
            Utils: path.resolve(__dirname, './src/utils')
        }
    }
});
