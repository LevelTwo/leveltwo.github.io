const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

const config = {
  entry: [
    path.join(__dirname, '/src/index.jsx'),
  ],
  resolve: {
    //When require, do not have to add these extensions to file's name
    extensions: ["", ".js", ".jsx", ".scss"],
    // node_modules: ["web_modules", "node_modules"]  (Default Settings)
  },
  //Render source-map file for final build
  devtool: 'source-map',
  //output config
  output: {
    path: buildPath,    //Path of output file
    filename: 'app.js',  //Name of output file
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    //Minify the bundle
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        //supresses warnings, usually from module minification
        warnings: false,
      },
    }),
    //Allows error warnings but does not stop compiling. Will remove when eslint is added
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
        test: /\.(js|jsx)$/, //All .js and .jsx files
        loader: 'babel-loader?optional=runtime&stage=0', //react-hot is like browser sync and babel loads jsx and es6-7
        exclude: [nodeModulesPath],
      },
      {
        test: /\.(scss|css)$/,
        loaders: ['style', 'css', 'sass'],
        include: [path.resolve(__dirname, "src")],
      },
    ],
  },
  //Eslint config
  eslint: {
    configFile: '.eslintrc', //Rules for eslint
  },
};

module.exports = config;
