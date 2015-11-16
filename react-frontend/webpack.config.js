var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'eval',
  entry: [
  'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
  'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
  './src/index.jsx' // Your appʼs entry point
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      { test: /\.json$/ , loader: 'json-loader'},
      { test: /\.jsx$/, loaders: ['react-hot', 'babel'], include: path.join(__dirname, 'src') }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};