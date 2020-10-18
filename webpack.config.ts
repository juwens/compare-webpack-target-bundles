const path = require('path');
// import webpack = require('webpack');
const webpackMerge = require('webpack-merge');

var baseConfig = {  
  target: 'async-node',
  entry: {
    entry: './entry.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist')
  },
  plugins: [
    /*
    new webpack.config.optimization.splitChunks({
      name: 'inline',
      filename: 'inline.js',
      minChunks: Infinity
    }),
    */
    /*
    new webpack.optimize.AggressiveSplittingPlugin({
        minSize: 5000,
        maxSize: 10000
    }),
    */
  ]
};

let targets = ['web', 'webworker', 'node', 'async-node', 'node-webkit', 'electron-main'].map((target) => {
  let base = webpackMerge.merge(baseConfig, {
    target: target,
    output: {
      path: path.resolve(__dirname, './dist/' + target),
      filename: '[name].' + target + '.js'
    }
  });
  return base;
});

module.exports = targets;
