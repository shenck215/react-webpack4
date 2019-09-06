const path = require('path')
const webpack = require('webpack')

module.exports = {
  resolve: {
    extensions: [
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".css",
      ".less",
      ".scss",
      ".json",
      ".gif",
      ".png",
      ".jpg",
      ".html"
    ],
    alias: {
      'src': path.resolve(__dirname,'../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)/,
        use: {
          loader: "url-loader",
          options: {
            outputPath: "images",
            limit: 1 * 1024
          }
        }
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name]-[hash:5].min.[ext]",
              limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
              publicPath: "fonts/",
              outputPath: "fonts/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ]
};
