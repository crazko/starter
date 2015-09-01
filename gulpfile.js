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

var filesToDist = [
  paths.base + paths.stylesDist,
  paths.base + paths.scripts,
  paths.base + 'www/*'
];

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './www'
    }
  });
});

gulp.task('clean', function() {
  del([
    'dist/*',
    'log/*',
    'temp/*',
    paths.stylesDist + '/*',
    paths.scripts + '/scripts.js'
  ]);
});

gulp.task('styles', function() {
  gulp.src(paths.stylesSource + '/main.less')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.less()
      .on('error', plugins.util.log))
    // .pipe(plugins.autoprefixer({ browsers: 'last 20 verions'}))
    .pipe(plugins.minifyCss())
    .pipe(plugins.rename('styles.css'))
    .pipe(plugins.sourcemaps.write('maps'))
    .pipe(gulp.dest(paths.stylesDist))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('scripts', function() {
  gulp.src([paths.scripts + '/*/*.js', paths.scripts + '/main.js'])
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.jshint.reporter('default'))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concat('scripts.js'))
    .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(paths.scripts))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('build', function() {
  gulp.src(filesToDist)
    .pipe(gulp.dest(paths.base + 'dist'));
});

gulp.task('default', ['browser-sync'], function () {
  gulp.watch(paths.stylesSource + '/**/*.less', ['styles']);
  gulp.watch(paths.scripts + '/**/*.js', ['scripts']);
});
