// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // Entry point
  output: {
    filename: "bundle.[contenthash].js", // hashed for cache busting
    path: path.resolve(__dirname, "dist"),
    clean: true, // Clean dist before build
  },
  mode: "development",
  devServer: {
    static: "./dist",
    port: 3000,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/, // all JS files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // optional, if using Babel
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
