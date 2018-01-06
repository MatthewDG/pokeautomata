const path = require('path');

module.exports = {
  entry: './lib/js/main',
  output: {
    path: path.resolve(__dirname, 'build/js'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: [/\.js?$/],
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '']
  }
};
