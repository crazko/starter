/* jshint node: true */
'use strict';

var gulp = require('gulp')
  , del = require('del')
  , browserSync = require('browser-sync')
  , gulpLoadPlugins = require('gulp-load-plugins')
  , plugins = gulpLoadPlugins();

var paths = {
  base: './',
  stylesSource: 'www/less',
  stylesDist: 'www/css',
  scripts: 'www/js'
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
  gulp.src(paths.styles + '/main.less')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.less()
      .on('error', plugins.util.log))
    // .pipe(plugins.autoprefixer({ browsers: 'last 20 verions'}))
    .pipe(plugins.minifyCss())
    .pipe(plugins.rename('style.min.css'))
    .pipe(plugins.sourcemaps.write('maps'))
    .pipe(gulp.dest(paths.stylesDist))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('scripts', function() {
  gulp.src(paths.scripts . '/**/*.js')
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.jshint.reporter('default'));
});
