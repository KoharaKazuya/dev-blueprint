var DashboardPlugin = require('webpack-dashboard/plugin');
var HtmlPlugin = require('html-webpack-plugin');
var StyleLintPlugin = require('stylelint-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    index: [__dirname + '/../src/index.ts', 'babel-polyfill']
  },

  output: {
    filename: '[name].js',
    path: __dirname + '/../dist'
  },

  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: 'tslint'
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        loader: 'babel!ts'
      },
      {
        test: /\.scss$/,
        loader: 'style!css?sourceMap!postcss?sourceMap!sass?sourceMap'
      }
    ]
  },

  plugins: [
    new DashboardPlugin(),
    new HtmlPlugin({ template: __dirname + '/../src/index.html' }),
    new StyleLintPlugin({})
  ],

  debug: true,
  devtool: 'source-map',

  postcss: function() {
    return [autoprefixer];
  }
}
