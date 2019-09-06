const path = require("path");
const webpack = require('webpack')
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.js");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')

const prodConfig = {
  mode: "production",
  entry: path.join(__dirname, "../src/index.js"),
  output: {
    path: path.join(__dirname, "../lib"),
    filename: "index.[chunkhash].js",
    libraryTarget: "umd",
    libraryExport: "default"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "cssModules__[name]__[local]--[hash:base64:5]"
              }
            }
          },
          "postcss-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "cssModules__[name]__[local]--[hash:base64:5]"
              }
            }
          },
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  devtool: "cheap-module-source-map",
  plugins: [
    new webpack.DefinePlugin({
      'NODE_ENV': '"production"'
    }),
    new CleanWebpackPlugin(),// 默认清楚output.path下生成的目录
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[id].[chunkhash].css'
    }),
    // 清除无用css
    new PurifyCSS({
      paths: glob.sync([
        // 要做css tree shaking的路径文件
        path.join(__dirname, '../template.html'),
        path.join(__dirname, '../src/*/*.js'),
      ]),
      purifyOptions: {// 兼容cssModule
        whitelist: ['*cssModules*']
      }
    })
  ],
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react"
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom"
    }
  },
  optimization: {
    splitChunks: {
      chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
    },
    // minimizer: [
    //   new TerserJSPlugin({}),
    //   new OptimizeCSSAssetsPlugin({})
    // ]
  },
};

module.exports = merge(baseConfig, prodConfig);
