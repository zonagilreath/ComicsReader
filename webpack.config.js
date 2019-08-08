var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'comics_reader_bundle.js',
    path: DIST_DIR
  },
  devtool: 'source-map',
  module : {
    rules : [
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        loader : 'babel-loader',      
        query: {
          presets: ['@babel/preset-react', '@babel/preset-env', 'minify'],
          plugins: ["babel-plugin-styled-components"]
        },
      }
    ]
  }
};