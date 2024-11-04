const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        "zlib": require.resolve("browserify-zlib"),
        "querystring": require.resolve("querystring-es3"),
        "path": require.resolve("path-browserify"),
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "url": require.resolve("url/"),
        "buffer": require.resolve("buffer/"),
        "fs": false,
        "http": require.resolve("stream-http"),
        "net": false,
        "util": require.resolve("util/"),
        "vm": require.resolve("vm-browserify"),
        "async_hooks": false,
      };

      // Correctly specify the path to the `process` polyfill with the `.js` extension
      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          process: require.resolve("process/browser.js"),
        })
      );

      return webpackConfig;
    }
  }
};

