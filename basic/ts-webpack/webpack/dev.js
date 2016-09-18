module.exports = {
  entry: {
    index: __dirname + '/../src/index.ts'
  },

  output: {
    filename: '[name].js',
    path: __dirname + '/../dist'
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts'
      }
    ]
  },

  devtool: 'source-map'
}
