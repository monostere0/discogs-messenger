module.exports = function(config) {
  config.set({
    basePath: './src',
    browsers: ['PhantomJS2'],
    frameworks: ['jasmine'],
    plugins: [
      'karma-phantomjs2-launcher',
      'karma-jasmine',
      'karma-babel-preprocessor'
    ],
    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        sourceMap: 'inline'
      }
    }
  });
};
