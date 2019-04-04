const {
  override,
  fixBabelImports,
  addLessLoader,
} = require("customize-cra");
const {
  paths
} = require('react-app-rewired');

let overideConfig = override(
  fixBabelImports("babel-plugin-import", {
    libraryName: "antd-mobile",
    style: true
  }),
  addLessLoader({
    // ident: 'postcss'
    javascriptEnabled: true
  })
);
const webpackConfig = require(paths.scriptVersion + '/config/webpack.config');
const overrides = require('react-app-rewired/config-overrides');
// module.exports = overrides.webpack(config, process.env.NODE_ENV);

// console.log(' overrides.webpack(config, process.env.NODE_ENV);->', overrides.webpack(webpackConfig, process.env.NODE_ENV));
// console.log('webpackConfig===>',webpackConfig);
// console.log('overideConfig=>',overideConfig);
module.exports = {
  webpack: override(
    // customize-cra plugins here
    overideConfig,
    // webpackConfig,
    (conf)=>{
      // console.log('conf',conf);
      return conf;
    },
    // overrides.webpack(webpackConfig, process.env.NODE_ENV),
    (config) => {
      config.devtool=false;
      // console.log('config',config);
      return config;
    },
  ),

  jest: config => {
    return config;
  },

  devServer: configFunction => (proxy, allowedHost) => {
    const config = configFunction(proxy, allowedHost);
    return config;
  },

  paths: (paths, env) => {
    return paths;
  }
};