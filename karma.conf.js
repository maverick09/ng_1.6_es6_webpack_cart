var path = require('path');

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    files: [
      { pattern: 'webpack.karma.context.js', watched: false }
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      'webpack.karma.context.js': ['webpack']
    },
    webpack: {
      module: {
        preLoaders: [
          {
            test: /\.spec\.js$/,
            include: /app/,
            exclude: /(node_modules)/,
            loader: 'babel',
            query: {
              cacheDirectory: true
            }
          }
        ],
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel?presets[]=es2015' },
          {
            test: /\.js$/,
            include: path.resolve(__dirname, '../app'),
            exclude: /(node_modules|test)/,
            loader: 'babel',
            query: {
              cacheDirectory: true
            }
          }
        ]
      },
      watch: true
    },
    webpackServer: {
      noInfo: true
    }
  });
};
