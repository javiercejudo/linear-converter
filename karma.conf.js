// Karma configuration

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/should/should.js',
      'tmp/arbitrary-precision',
      'tmp/linear-preset-factory',
      'tmp/linear-presets',
      'tmp/bigjs-adapter',
      'tmp/floating-adapter',
      'tmp/linear-converter.js',
      'test/browser/*.js'
    ],


    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'saucelabs'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    sauceLabs: {
      username: process.env.SAUCE_USERNAME,
      accessKey: process.env.SAUCE_ACCESS_KEY,
      build: process.env.TRAVIS_BUILD_NUMBER,
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
      startConnect: false,
      testName: 'linear-converter: browser tests'
    },


    customLaunchers: {
      'SL_Chrome': {
        base: 'SauceLabs',
        browserName: 'chrome'
      },
      'SL_Firefox': {
        base: 'SauceLabs',
        browserName: 'firefox'
      },
      'SL_Safari': {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'OS X 10.10'
      },
      'SL_IE_9': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 7',
        version: '9'
      },
      'SL_IE_10': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 7',
        version: '10'
      },
      'SL_IE_11': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 8.1',
        version: '11'
      },
      'SL_Edge': {
        base: 'SauceLabs',
        browserName: 'microsoftedge',
        platform: 'Windows 10'
      },
      'SL_Opera': {
        base: 'SauceLabs',
        browserName: 'opera',
        platform: 'Windows 7',
        version: '12.12'
      },
      'SL_Android': {
        base: 'SauceLabs',
        browserName: 'android',
        deviceName: 'Samsung Galaxy S4 Emulator',
        deviceOrientation: 'portrait',
        platform: 'Linux',
        version: '4.4'
      },
      'SL_iOS': {
        base: 'SauceLabs',
        browserName: 'iphone',
        deviceName: 'iPhone Simulator',
        deviceOrientation: 'portrait',
        platform: 'OS X 10.10',
        version: '8.2'
      },
    },


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // timeout for capturing a browser (in ms)
    captureTimeout: 0,


    // how long will Karma wait for a message from a browser before disconnecting from it (in ms).
    browserNoActivityTimeout: 0,


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
