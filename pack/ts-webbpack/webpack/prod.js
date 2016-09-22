var webpack = require('webpack');
var HtmlPlugin = require('html-webpack-plugin');
var StyleLintPlugin = require('stylelint-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    index: ['babel-polyfill', __dirname + '/../src/index.ts']
  },

  output: {
    filename: '[name].js',
    path: __dirname + '/../dist'
  },

  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".ts"]
  },

  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'tslint'
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'babel!ts'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'style!css!postcss!sass'
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new webpack.optimize.DedupePlugin(),
    new HtmlPlugin({ template: __dirname + '/../src/index.html' }),
    new StyleLintPlugin({ failOnError: true })
  ],

  postcss: function() {
    return [autoprefixer];
  },

  tslint: {
    emitErrors: true,
    failOnHint: true
  }
}
