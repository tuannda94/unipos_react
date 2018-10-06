const mix = require('laravel-mix');

mix.js('src/App.js', 'public/js/app.js')
    .js('src/background.js', 'public/js/background.js');
    // .sass('src/App.scss', 'public/js/');
mix.webpackConfig({
    resolve: {
        alias: {
            src: path.resolve(__dirname, './src'),
            Api: path.resolve(__dirname, './src/api'),
            Component: path.resolve(__dirname, './src/component'),
            Routes: path.resolve(__dirname, './src/routes'),
            Utils: path.resolve(__dirname, './src/utils')
        }
    }
});
