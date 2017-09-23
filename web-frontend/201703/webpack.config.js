var webpack = require('webpack');
var DashboardPlugin = require('webpack-dashboard/plugin');
var HtmlPlugin = require('html-webpack-plugin');
var StyleLintPlugin = require('stylelint-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = function(options) {
  var env = options.env;

  var config = {
    entry: {
      index: ['babel-polyfill', './src/index.ts']
    },

    output: {
      filename: '[name].js',
      path: __dirname + '/dist'
    },

    resolve: {
      extensions: ['.ts', '.js', '.json']
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
            'ts-loader'
          ]
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          enforce: 'pre',
          loader: 'tslint-loader',
          options: {
            failOnHint: env === 'prd'
          }
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: env !== 'prd',
                importLoaders: 2
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: env !== 'prd' ? 'source-map' : undefined,
                plugins: function() {
                  return [autoprefixer];
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: env !== 'prd'
              }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|svg|ttf|eot|woff2?)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000
              }
            }
          ]
        }
      ]
    },

    plugins: [
      new HtmlPlugin({ template: __dirname + '/src/index.html' }),
      new StyleLintPlugin({
        failOnError: env === 'prd'
      })
    ]
  };

  if (env === 'prd') {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
    );
  }

  if (env === 'dev') {
    config.devtool = 'source-map';
    config.devServer = {
      inline: true,
      contentBase: __dirname + '/dist'
    };
    config.plugins.push(new DashboardPlugin());
  }

  if (env === 'test') {
    // workaround for growl module error
    config.node = {
      child_process: "empty",
      fs: "empty"
    };
  }

  return config;
};
