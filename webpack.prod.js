const merge = require('webpack-merge');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  // plugins: [
  //   new FaviconsWebpackPlugin('./assets/images/<favicon>.png'),
  // ],
});
