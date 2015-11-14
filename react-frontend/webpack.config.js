var webpack = require('webpack');

module.exports = {
  cache: true,
  entry: {
    main:  './index.js'
  },
  output: {
    path: 'public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.json$/ , loader: 'json-loader'}
    ]
  }
};