var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: './src/entry.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/assets/'
    },
    module: {
        loaders: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src')
        }]
    }
};