const gulp = require('gulp');
const concat = require('gulp-concat-util');
const merge = require('merge2');
const KarmaServer = require('karma').Server;
const browserSync = require('browser-sync');
const argv = require('yargs').argv;
const $ = require('gulp-load-plugins')({
  scope: ['devDependencies'],
  lazy: true,
  camelize: true
});

const JS_FILES = ['src/**/*.js', '!src/**/*.test.js'];
const CSS_FILES = ['src/**/*.scss', 'src/js/**/*.scss'];
const INDEX = ['src/index.html'];
const TARGET = '../dist';

const conf = require('../middleware/conf')();

//had to be done due to script precedence
const VENDOR_SCRIPTS = [
    'lodash/lodash.js',
    'angular/angular.js',
    'angular-animate/angular-animate.js',
    'angular-messages/angular-messages.js',
    'angular-scroll/angular-scroll.js',
    'angular-translate/dist/angular-translate.js',
    'angular-ui-router/release/angular-ui-router.js'
  ].map((file) => '../node_modules/' + (!argv.production ? file : file.replace('.js', '.min.js')));

const VENDOR_CSS = [];

gulp.task('vendor-js', () => {
  return gulp.src(VENDOR_SCRIPTS)
    .pipe($.concatUtil('vendor.js'))
    .pipe(gulp.dest(TARGET));
});

gulp.task('app-js', ['vendor-js'], () => {

var appJs = gulp.src(JS_FILES);

return appJs
  .pipe($.if(!argv.production, $.sourcemaps.init()))
  .pipe($.babel())
  .pipe($.ngAnnotate())
  .pipe($.angularFilesort())
  // Wrap all JS files with a self-invoking function.
  .pipe($.concatUtil.header('!function(){'))
  .pipe($.concatUtil.footer('}();'))
  .pipe($.concatUtil('app.js'))
  // Uglify only for production.
  .pipe($.if(argv.production, $.uglify()))
  // Wrap app.js with a self-invoking function to enforce strict mode.
  // We need this to be in a self-invoking function call to prevent global strict mode.
  .pipe($.concatUtil.header('!function(){\'use strict\';'))
  .pipe($.concatUtil.footer('}();'))
  // Finish the sourcemaps only in development.
  .pipe($.if(!argv.production, $.sourcemaps.write()))
  .pipe(gulp.dest(TARGET));

});

gulp.task('vendor-css', () => {
  return gulp.src(VENDOR_CSS)
    .pipe($.concatUtil('vendor.css'))
    .pipe(gulp.dest(`${TARGET}/css`));
});

gulp.task('app-css', ['vendor-css'], () => {
  gulp.src(CSS_FILES)
  .pipe($.sass().on('error', $.sass.logError))
  .pipe($.autoprefixer())
  .pipe($.flatten())
  .pipe($.if(argv.production, $.cssmin()))
  .pipe(gulp.dest(`${TARGET}/css`));
});

gulp.task('app-clean', () => {
  return gulp.src(TARGET, {read: false})
    .pipe($.clean({
      force: true
    }));
});

gulp.task('browser-sync', () => {

  var proxy = {
    target: `localhost:${conf.port}`
  };

  return browserSync({
    proxy: proxy,
    notify: false, // Do not show the the notification
    open: false, // don't automatically open browser
    ghostMode: false // don't make it mirror all actions accross browsers (click/forms/scroll)
  });
});

gulp.task('unit-test', ['default'], (done) => {
  new KarmaServer({
    configFile: `${__dirname}/karma.conf.js`,
    singleRun: true
  }, done).start();
});

gulp.task('watch', ['browser-sync'], () => {
  gulp.watch(JS_FILES, ['app-js', browserSync.reload]);
  gulp.watch(CSS_FILES, ['app-css', browserSync.reload]);
  gulp.watch(INDEX, ['app-index', browserSync.reload]);
});

gulp.task('app-index', () => {
  return gulp.src(INDEX)
    .pipe(gulp.dest(TARGET));
});

gulp.task('default', $.sequence('app-clean', ['app-js', 'app-css', 'app-index']));
