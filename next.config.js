require('dotenv').config()
const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');
const withImages = require('next-images')
module.exports = withImages()

dotenvLoad();
 
const withNextEnv = nextEnv();

const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = withNextEnv({
  env: {
    customKey: 'my-value',
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: '[name].[ext]'
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      }
    ],
    loaders: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
      loader: 'url-loader?limit=100000' }]
  },
  webpack5: false,
  target: "server"
});
