var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: [
        './src/entry.jsx'
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/assets'),
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