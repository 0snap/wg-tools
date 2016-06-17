var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        './client.js'
    ],
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            //client side browser js process.env definitions:
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
        }),
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/assets'),
        publicPath: '/assets'
    },
    module: {
        loaders: [{
            test: /\.js$|\.jsx$/,
            exclude: /node_modules/,
            loaders: ['babel-loader?presets[]=es2015&presets[]=react'],
        },
        {
            test: /\.scss$/,
            loader: 'style-loader!css-loader!sass-loader',
            include: path.join(__dirname, 'src')
        }]
    }
};