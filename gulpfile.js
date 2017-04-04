var gulp = require('gulp');
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');


gulp.task('build', ['js', 'scss', 'html'], function() {
  gulp.watch(['src/**/*'], ['js', 'scss', 'html'] )
});

gulp.task('js', function() {
  return gulp.src('lib/js/main.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('build/js/'))
});

gulp.task('scss', function() {
  return gulp.src('lib/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('build/css/'));
});

gulp.task('html', function() {
  return gulp.src('./index.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('default', ['build']);
