const webpack = require('webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        // 'window.Detector': 'Madeleine.js/src/lib/detector.js',
        // 'window.Lily': 'Madeleine.js/src/Madeleine.js',
      }),
    ],
  },
}
