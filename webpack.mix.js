const mix = require('laravel-mix');

mix.react('src/index.js', 'public/js/popup/app.js')
    .react('src/content.js', 'public/js/content/app.js')
    .js('src/background.js', 'public/js/background.js')
    .setPublicPath('public');
    // .sass('src/App.scss', 'public/js/');
mix.webpackConfig({
    resolve: {
        alias: {
            src: path.resolve(__dirname, './src'),
            Api: path.resolve(__dirname, './src/api'),
            Components: path.resolve(__dirname, './src/components'),
            Routes: path.resolve(__dirname, './src/routes'),
            Utils: path.resolve(__dirname, './src/utils')
        }
    }
});
