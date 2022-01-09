const path = require('path');
const webpack = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = Object.assign(webpack, {
    entry: {
        main: path.join(__dirname, 'src/index.ts'),
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Word Game',
            template: path.join(__dirname, 'src/index.html'),
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    context: 'src',
                    from: '*.css',
                },
            ],
        }),
    ],
});
