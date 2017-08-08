const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: join(__dirname, 'src'),
  entry: {
    main: './main.js'
  },
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                [
                  'env', {
                    'targets': {
                      'browsers': ['last 2 versions']
                    }
                  }
                ],
                'react'
              ],
              plugins: [
                'transform-runtime',
                'styled-jsx/babel',
                'transform-class-properties',
                'transform-function-bind',
                'transform-object-rest-spread',
                [
                  'transform-imports', {
                    'rxjs': {
                      transform: 'rxjs/${member}',
                      preventFullImport: true,
                      skipDefaultConversion: true
                    },
                    'rxjs/observable': {
                      transform: 'rxjs/observable/${member}',
                      preventFullImport: true,
                      skipDefaultConversion: true
                    },
                    'rxjs/operator': {
                      transform: 'rxjs/operator/${member}',
                      preventFullImport: true,
                      skipDefaultConversion: true
                    }
                  }
                ]
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    })
  ],
  devServer: {
    contentBase: join(__dirname, 'dist'),
    historyApiFallback: true,
    inline: true,
    port: 8000,
  },
  devtool: 'source-map',
};
