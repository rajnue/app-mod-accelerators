var webpack = require('webpack');
var path = require('path');

// variables
var isProduction = process.argv.indexOf('production') >= 0 || process.env.NODE_ENV === 'production';
var sourcePath = path.join(__dirname, './src');
var outPath = path.join(__dirname, './dist');
var postcssImport = require('postcss-import');
var postcssPresetEnv = require('postcss-preset-env');
var cssnano = require('cssnano');

// plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');

const webpackConfig = {
  context: sourcePath,
  entry: { app: './index.tsx' },
  output: {
    path: outPath,
    filename: 'js/bundle.js',
    chunkFilename: 'js/[chunkhash].js',
    publicPath: '/',
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx', 'scss'],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // (jsnext:main directs not usually distributable es6 format, but es6 sources)
    mainFields: ['module', 'browser', 'main'],
  },
  module: {
    rules: [
      // .ts, .tsx
      {
        test: /\.tsx?$/,
        use: ['ts-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/,
        use: [
          !isProduction ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isProduction,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [postcssImport, postcssPresetEnv, cssnano],
            },
          },
        ],
      },
      // css
      {
        test: /\.scss$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',

          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|jpg|svg)$/,
        loader: 'url-loader?limit=100000',
      },

      // static assets
      { test: /\.html$/, use: 'html-loader' },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: 'all',
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 10,
        },
      },
    },
    runtimeChunk: true,
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: isProduction ? 'production' : 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false,
    }),
    new WebpackCleanupPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles/[contenthash].css',
      disable: !isProduction,
    }),
    new HtmlWebpackPlugin({
      template: '../public/index.html',
    }),
    new CopyWebpackPlugin(
      [
        { from: '../src/assets/images', to: outPath + '/assets/images' },
        { from: '../src/assets/styles', to: outPath + '/styles' },
        { from: '../src/assets/fonts', to: outPath + '/fonts' },
        {
          from: '../public/manifest.json',
          to: outPath + '/public/manifest.json',
        },
      ],
      { copyUnmodified: true }
    ),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ja|it/),
  ],
  devServer: {
    contentBase: sourcePath,
    hot: true,
    inline: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    proxy: {
      '/api-pop/*': {
        // FIXMEAvantas Dev: Change port to '8093' to use local APIs
        target: 'http://localhost:8080',
        secure: false,
        ws: true,
      },
      '/v2/api/*': {
        target: 'http://localhost:8080',
        secure: false,
        ws: true,
      },
    },
    stats: 'minimal',
  },
  node: {
    // workaround for webpack-dev-server issue
    // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
    fs: 'empty',
    net: 'empty',
  },
};

module.exports = webpackConfig;
