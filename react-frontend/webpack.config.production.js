var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: './client.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/assets'),
        publicPath: '/'
    },
    plugins: [
        new ExtractTextPlugin('bundle.css'),
        new webpack.DefinePlugin({
            //client side browser js process.env definitions:
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
    ],
    module: {
        loaders: [{
            test: /\.js$|\.jsx$/,
            exclude: /node_modules/,
            loaders: ['babel-loader?presets[]=es2015&presets[]=react'],
        },
        {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style', 'css!sass'),
            include: path.join(__dirname, 'src')
        }]
    }
};