import path from 'path';

export default {
  entry: {
    index: './lib/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
    library: 'availity-react',
    libraryTarget: 'commonjs2'
  },
  externals: {
    react: 'react'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel?stage=0'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
