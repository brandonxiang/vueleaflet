const path = require('path');
const webpack = require('webpack');
var utils = require('./utils')

const config = module.exports = {
  plugins: []
};

// Set context to root of project
config.context = path.resolve(__dirname, '..');

// Client entry
config.entry = {
  VueLeaflet: path.resolve(__dirname, '../src/index.js')
};

// Basic output config
config.output = {
  path: path.resolve(__dirname, '../dist'),
  filename: 'vueleaflet.js',
  library: ["VueLeaflet"],
  libraryTarget: "umd",
};

config.externals = [{
  'leaflet': {
    umd: 'L',
    root: 'L',
    global: 'L',
    commonjs2: 'leaflet',
    commonjs: 'leaflet',
    amd: 'leaflet'
  },
  'vue': {
    umd: 'Vue',
    global: 'Vue',
    root: 'Vue',
    commonjs2: 'vue',
    commonjs: 'vue',
    amd: 'vue'
  }
}];
// Resolver config
config.resolve = {
  extensions: ['.js', '.vue'],
  enforceExtension: false
};

config.resolveLoader = {
  modules: config.resolve.modules
};

config.module = {
  loaders: [
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      // important: exclude files in node_modules, otherwise it's going to be really slow!
      exclude: /node_modules|vendor/
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    },
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.output.filename = "vueleaflet.min.js"
  config.devtool = '#source-map';

  // Pass build environment inside bundle
  // This will strip comments in Vue code & hort-circuits all Vue.js warning code
  config.plugins.push(new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  }));

  // The UglifyJsPlugin will no longer put loaders into minimize mode, and the debug option has been deprecated.
  config.plugins.push(new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }));

  // Minify with dead-code elimination
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {warnings: false},
    sourceMap: true
  }));
} else {
  config.devtool = '#eval-source-map';
}
