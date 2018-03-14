const { join, posix } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const API_URL = process.env.API_URL || 'https://web-go-demo.herokuapp.com';

const SOURCE_ROOT = join(__dirname, 'src');
const DIST_ROOT = join(__dirname, 'build');

module.exports = ({ prod = false } = {}) => ({
  context: SOURCE_ROOT,
  entry: {
    client: './client.js',
  },
  output: {
    path: DIST_ROOT,
    filename: prod ? '[name].[hash].js' : '[name].js',
    chunkFilename: prod ? '[id].[chunkhash].js' : '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: posix.join('assets', 'images/[name].[hash].[ext]'),
        },
      }, {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: posix.join('assets', 'medias/[name].[hash].[ext]'),
        },
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: posix.join('assets', 'fonts/[name].[hash].[ext]'),
        },
      },
    ].filter(Boolean),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '~': join(SOURCE_ROOT, 'app'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      minify: prod && {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
      chunksSortMode: prod ? 'dependency' : 'auto',
    }),
    new CopyWebpackPlugin([
      'assets/images/favicon.ico',
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(prod ? 'production' : 'development'),
        API_URL: JSON.stringify(API_URL),
      },
    }),
    prod && new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
        },
      },
      sourceMap: true,
      parallel: true,
    }),
    prod && new webpack.HashedModuleIdsPlugin(),
    prod && new webpack.optimize.ModuleConcatenationPlugin(),
    prod && new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(join(__dirname, 'node_modules')) === 0
        );
      },
    }),
    prod && new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
    prod && new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3,
    }),
    !prod && new webpack.HotModuleReplacementPlugin(),
    !prod && new webpack.NamedModulesPlugin(),
    !prod && new webpack.NoEmitOnErrorsPlugin(),
  ].filter(Boolean),
  devServer: {
    contentBase: DIST_ROOT,
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 8000,
  },
  devtool: prod ? 'hidden-source-map' : 'cheap-module-eval-source-map',
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
});
