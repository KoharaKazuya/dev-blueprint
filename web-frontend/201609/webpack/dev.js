var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');

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
        loaders: ['babel', 'eslint']
      },
      {
        test: /\.html$/,
        loaders: ['html']
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css?sourceMap', 'postcss!sourceMap']
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
    new DashboardPlugin(),
    new HtmlWebpackPlugin({ template: __dirname + '/../src/index.html' })
  ],

  devtool: 'source-map',

  devServer: {
    inline: true,
    contentBase: __dirname + "/../dist"
  }
}
