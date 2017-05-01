module.exports = function(config) {
  config.set({
    basePath: '',
    files: [
      '../dist/vendor.js',
      '../node_modules/angular-mocks/angular-mocks.js',
      '../dist/app.js',
      './src/**/*.test.js'
    ],
    browsers: ['PhantomJS2'],
    frameworks: ['jasmine'],
    preprocessors: {
      'src/**/*.test.js': ['babel'],
    },
    plugins: [
      'karma-phantomjs2-launcher',
      'karma-jasmine',
      'karma-babel-preprocessor'
    ],
    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        sourceMap: 'inline'
      },
      filename(file) { return file.originalPath.replace(/\.js$/, '.es5.js'); },
      sourceFileName(file) { return file.originalPath; },
    },
    debug: true,
  });
};
