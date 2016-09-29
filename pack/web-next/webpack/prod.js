var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: __dirname + '/../src/index.js'
  },

  output: {
    filename: '[name].js',
    path: __dirname + '/../dist'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'babel',
          {
            loader: 'eslint',
            query: { failOnWarning: true, failOnError: true }
          }
        ]
      },
      {
        test: /\.html$/,
        loaders: ['html']
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss']
      },
      {
        test: /\.(png|jpe?g|svg|ttf|eot|woff2?)$/,
        loaders: ['url?limit=10000']
      }
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function() {
          return [require('postcss-cssnext')];
        }
      }
    }),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({ template: __dirname + '/../src/index.html' })
  ]
}
