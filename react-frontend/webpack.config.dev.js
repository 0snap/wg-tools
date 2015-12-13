var webpack = require('webpack');
var path = require('path');

module.exports = {

    entry: './src/entry.jsx',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'build'),
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