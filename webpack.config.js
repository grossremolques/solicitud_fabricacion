const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWepbackPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const DotEnv = require('dotenv-webpack');
const { CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
  },
  resolve: {
    extensions: [".js"],
    alias: {
        '@utils': path.resolve(__dirname, 'src/utils/'),
        '@assets': path.resolve(__dirname, 'src/assets/'),
        '@styles': path.resolve(__dirname, 'src/styles/')
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.png/,
        type: 'asset/resource'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
        filename: 'assets/[name].[contenthash].css'
    }),
    new CopyWepbackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/favicon.png"),
          to: "assets",
        },
      ],
    }),
    new DotEnv(),
    new CleanWebpackPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin()
    ]
  }
};
