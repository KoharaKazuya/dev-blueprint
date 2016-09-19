var StyleLintPlugin = require('stylelint-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
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
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'style!css?sourceMap!postcss?sourceMap!sass?sourceMap'
      }
    ]
  },

  plugins: [
    new StyleLintPlugin({})
  ],

  debug: true,
  devtool: 'source-map',

  postcss: function() {
    return [autoprefixer];
  },

  // workaround for growl module error
  node: {
    child_process: "empty",
    fs: "empty"
  }
}
