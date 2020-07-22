const path = require('path');
const SRC_PATH = path.join(__dirname, '../src');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var isProduction = process.argv.indexOf('production') >= 0 || process.env.NODE_ENV === 'production';
var postcssImport = require('postcss-import');
var postcssPresetEnv = require('postcss-preset-env');
var cssnano = require('cssnano');

//dont need stories path if you have your stories inside your //components folder
module.exports = ({ config }) => {
  
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: [SRC_PATH],
    use: [
      'ts-loader',
      {
        loader: require.resolve('react-docgen-typescript-loader'),
      }
    ],
  });
  config.module.rules.push({
    test: /\.css$/,
    use: [
      !isProduction ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          sourceMap: isProduction,
          importLoaders: 1,
        },
      }, // TODO: enable sourceMap in devMode without FOUC
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          plugins: () => [postcssImport, postcssPresetEnv, cssnano],
        },
      },
    ],
  });
  
  config.module.rules.push({
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
  });
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: '[contenthash].css',
    })
  );
  config.module.rules.push({
    test: /\.stories\.tsx?$/,
    loaders: [
      {
        loader: require.resolve('@storybook/source-loader'),
        options: { parser: 'typescript' },
      },
    ],
    enforce: 'pre',
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
