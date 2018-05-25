const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const javascript = {
  test: /\.js$/,
  exclude: ['node_modules'],
  use: ['babel-loader']
};

const stylus = {
  test: /\.styl$/,
  exclude: ['node_modules'],
  use: [
    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'stylus-loader',
      options: {
        use: [require('nib')()],
        import: ['~nib/lib/nib/index.styl']
      }
    }
  ]
};

const commonConfig = {
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve('./dist')
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  module: {
    rules: [javascript, stylus]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html'
    }),
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
    })
  ]
};

let config;
if (devMode) {
  config = merge(commonConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      host: 'localhost',
      port: 3000,
      open: true
    }
  });
} else {
  config = merge(commonConfig, {
    mode: 'production'
  });
}


module.exports = config;