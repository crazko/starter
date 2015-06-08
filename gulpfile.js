/* jshint node: true */
'use strict';

var gulp = require('gulp')
  , del = require('del')
  , browserSync = require('browser-sync')
  , gulpLoadPlugins = require('gulp-load-plugins')
  , plugins = gulpLoadPlugins();

var paths = {

};

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('clean', function() {
  del([
    'dist/*',
    'log/*',
    'temp/*',
    'www/css/*'
  ]);
});

gulp.task('styles', function() {
  gulp.src('www/less/main.less')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.less()
      .on('error', plugins.util.log))
    // .pipe(plugins.autoprefixer({ browsers: 'last 20 verions'}))
    .pipe(plugins.minifyCss())
    .pipe(plugins.rename('style.min.css'))
    .pipe(plugins.sourcemaps.write('maps'))
    .pipe(gulp.dest('www/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('scripts', function() {
  gulp.src('www/js/**/*.js')
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.jshint.reporter('default'));
});
