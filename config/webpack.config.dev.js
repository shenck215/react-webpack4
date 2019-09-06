const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const baseConfig = require("./webpack.base.js");

const devConfig = {
  mode: "development",
  entry: path.join(__dirname, "../dev/app.js"),
  output: {
    path: path.join(__dirname, "../dev/"),
    filename: "index.[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
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
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
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
  devServer: {
    hot: true,
    host: "172.16.41.31",
    contentBase: path.join(__dirname, "../dev/"),
    compress: true,
    port: 3001,
    historyApiFallback: true // 所有的404都连接到index.html
  },
  devtool: "cheap-module-eval-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "../template.html")
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: '"development"',
    })
  ]
};

module.exports = merge(baseConfig, devConfig);
