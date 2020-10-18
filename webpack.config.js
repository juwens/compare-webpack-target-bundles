const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const baseConfig = {
  target: 'async-node',
  entry: {
    entry: './entry.js'
  },
  output: {
    filename: '[id].js',
    path: path.resolve(__dirname, './dist')
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};

let targets = ['web', 'webworker', 'node', 'async-node', 'node-webkit', 'electron-main', 'es5', 'es6', "es2020"].map((target) => {
  let base = webpackMerge.merge(baseConfig, {
    mode: "development",
    target: target,
    output: {
      path: path.resolve(__dirname, './dist/' + target),
      filename: '[name].' + target + '.js'
    }
  });
  return base;
});

module.exports = targets;
