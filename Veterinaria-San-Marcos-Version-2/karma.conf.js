module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    files: ['test/**/*.spec.js'],
    preprocessors: {
      'test/**/*.spec.js': ['webpack']
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  ['@babel/preset-react', { runtime: 'automatic' }]
                ],
                plugins: [
                  ['istanbul', { exclude: ['**/*.spec.js', '**/test/**'] }]
                ]
              }
            }
          },
          {
            test: /\.css$/,
            use: 'null-loader'
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx']
      }
    },
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-dev-shm-usage']
      }
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' }
      ]
    },
    singleRun: true
  });
};
