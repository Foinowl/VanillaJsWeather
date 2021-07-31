const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
  entry: ['@babel/polyfill', './src/js/app.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
  },
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
    new Dotenv(),
    new MomentLocalesPlugin(),
  ],
  module: {
    rules: [
		{
		//IMAGE LOADER
		test: /\.(jpe?g|png|gif|svg)$/i,
		loader:'file-loader'
		},
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', 
          'css-loader', 
          'sass-loader', 
        ],
      },
    // { test:/\.svg$/, loader: 'svg-inline-loader' },
    ],
  },
};
