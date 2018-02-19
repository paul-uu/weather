var HTMLWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  /* entry point */
  entry: __dirname + '/app/index.js',

  /* list of transformations done to index.js (and associated modules) */
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        //include: paths.appSrc,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ],
  },
  output: {
    filename: 'transformed.js',
    path: __dirname + '/build'
  },
  plugins: [
    HTMLWebpackPluginConfig,
    new ExtractTextPlugin('app.css')
  ]
};