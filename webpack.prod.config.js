var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },

  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('bundle.css')
  ],

  module: {
    //preLoaders: [
    //  {
    //    test: /\.js$/,
    //    loaders: ['eslint'],
    //    include: [
    //      path.resolve(__dirname, 'src'),
    //    ],
    //  }
    //],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        },
        include: [path.join(__dirname, 'src')]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
      },
      {
        test: /\.scss/,
        loader: ExtractTextPlugin.extract('style', 'css!sass'),
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'file',
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json',
      },
    ]
  }
};