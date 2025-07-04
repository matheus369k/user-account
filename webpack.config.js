const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const webpack = require('webpack')
const path = require('node:path');
require('dotenv').config()

module.exports = {
  entry: path.resolve(__dirname, 'src/scripts/index.ts'),
  module: {
    rules: [
      {
        test: /\.(ts|mts|cts)?$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      }
    ]
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    hot: true,
    port: 5173,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/pages/index.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: path.resolve(__dirname, 'src/pages/login.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'register.html',
      template: path.resolve(__dirname, 'src/pages/register.html')
    }),
    new webpack.DefinePlugin({
      "process.env.BACK_END_URL": JSON.stringify(process.env.BACK_END_URL)
    }),
    new CopyWebpackPlugin({
      patterns: [
        path.resolve(__dirname, 'src/assets/paimon.png'),
        path.resolve(__dirname, 'src/assets/favicon.ico')
      ]
    }),
    new MiniCssExtractPlugin()
  ]
  ,
  resolve: {
    extensions: [
      '.ts', '.cts', '.mts', '.js', '.mjs', '.cjs', '.sass', ".scss", ".css", ".gif", ".jpeg", ".jpg", ".svg", ".png",
    ],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@*': path.resolve(__dirname, 'src/*'),
    }
  },
  devtool: "inline-source-map",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    minimize: true,
  }
}