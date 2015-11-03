//Run karma
// karma start ./karma.config.js --log-level debug --single-run
module.exports = function (config) {
  'use strict';
  config.set({
    autoWatch: true,
    singleRun: true,

    frameworks: ['jspm', 'jasmine'],

    files: [
      'node_modules/babel-core/browser-polyfill.js'
    ],

    jspm: {
      config: './config.js',
      loadFiles: [
        './src/**/*.spec.js'
      ],
      serveFiles: [
        './src/**/!(*spec).js'
      ]
    },

    proxies: {
      '/src': '/base/src'
    },

    browsers: ['PhantomJS'],

    preprocessors: {
      './src/**/!(*spec).js': ['babel', 'sourcemap', 'coverage']
    },

    babelPreprocessor: {
      options: {
        sourceMap: 'inline',
        blacklist: ['useStrict']
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },

    reporters: ['coverage', 'progress'],

    coverageReporter: {
      instrumenters: {isparta: require('isparta')},
      instrumenter: {
        'src/*.js': 'isparta'
      },

      reporters: [
        {
          type: 'text-summary',
          dir: './.code-coverage/',
          subdir: normalizeBrowserName
        },
        {
          type: 'html',
          dir: './.code-coverage/',
          subdir: normalizeBrowserName,
          watermarks: {
            statements: [85, 99.9],
            functions: [85, 99.9],
            branches: [85, 99.9],
            lines: [85, 99.9]
          }
        },
        {
          type: 'lcovonly',
          dir: './.code-coverage/',
          subdir: normalizeBrowserName
        }
      ]
    }
  });

  function normalizeBrowserName(browser) {
    return browser.toLowerCase().split(/[ /-]/)[0];
  }
};