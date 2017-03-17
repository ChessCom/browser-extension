/* eslint import/no-extraneous-dependencies: 0 */
const path = require('path');
const webpack = require('webpack');

const host = 'localhost';
const port = 3000;
const customPath = path.join(__dirname, './customPublicPath');
const hotScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&dynamicPublicPath=true';

const createDevConfig = (platform) => {
  const config = {};
  if (platform === 'firefox') {
    config.outputDir = '../devFirefox/js';
  } else {
    config.outputDir = '../dev/js';
  }
  const baseDevConfig = () => ({
    devtool: 'eval-source-map',
    entry: {
      popup: [customPath, hotScript, path.join(__dirname, '../chrome/extension/popup')],
      background: [customPath, hotScript, path.join(__dirname, '../chrome/extension/background')],
    },
    devMiddleware: {
      publicPath: `https://${host}:${port}/js`,
      stats: {
        colors: true
      },
      noInfo: true
    },
    hotMiddleware: {
      path: '/js/__webpack_hmr'
    },
    output: {
      path: path.join(__dirname, config.outputDir),
      filename: '[name].bundle.js',
      chunkFilename: '[id].chunk.js'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.IgnorePlugin(/[^/]+\/[\S]+.prod$/),
      new webpack.DefinePlugin({
        __HOST__: `'${host}'`,
        __PORT__: port,
        'process.env': {
          NODE_ENV: JSON.stringify('development')
        }
      })
    ],
    resolve: {
      extensions: ['', '.js']
    },
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['react-hmre']
        }
      }, {
        test: /\.css$/,
        loaders: [
          'style',
          'css?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss'
        ]
      }, {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }]
    }
  });

  const handleLiveChangesConfig = baseDevConfig();
  handleLiveChangesConfig.entry = [
    customPath,
    path.join(__dirname, '../chrome/extension/handleLiveChanges')
  ];
  delete handleLiveChangesConfig.hotMiddleware;
  delete handleLiveChangesConfig.module.loaders[0].query;
  handleLiveChangesConfig.plugins.shift(); // remove HotModuleReplacementPlugin
  handleLiveChangesConfig.output = {
    path: path.join(__dirname, config.outputDir),
    filename: 'handleLiveChanges.bundle.js',
  };
  const appConfig = baseDevConfig();

  return [
    handleLiveChangesConfig,
    appConfig
  ];
};

module.exports = createDevConfig;

