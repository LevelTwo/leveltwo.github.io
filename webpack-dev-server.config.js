const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/src/index.jsx'),
  ],
  resolve: {
    extensions: ["", ".js", ".jsx", ".scss"],
  },
  devServer:{
    contentBase: './',
    devtool: 'eval',
    host: '0.0.0.0',
    hot: true,
    inline: true,
    port: 8000,
  },
  devtool: 'eval',
  output: {
    path: buildPath,
    filename: 'app.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include: [path.resolve(__dirname, "src")],
        exclude: [nodeModulesPath],
      },
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['react-hot','babel-loader?optional=runtime&stage=0'],
        exclude: [nodeModulesPath],
      },
      {
        test: /\.(scss|css)$/,
        loaders: ['style', 'css', 'sass'],
        include: [path.resolve(__dirname, "src")],
      },
    ],
  },
  eslint: {
    configFile: '.eslintrc',
  },
};
