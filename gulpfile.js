var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var del = require('del');
var coveralls = require('gulp-coveralls');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var rename = require('gulp-rename');

var pkg = require('./package.json');

gulp.task('clean:coverage', function (cb) {
  del(['coverage'], cb);
});

gulp.task('clean:dist', function (cb) {
  del(['dist'], cb);
});

gulp.task('instrument', function () {
  return gulp.src(['src/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['clean:coverage', 'instrument'], function () {
  return gulp.src(['test/iojs/*.js'])
    .pipe(mocha())
    .pipe(istanbul.writeReports());
});

gulp.task('coveralls', function () {
  gulp.src('coverage/lcov.info')
    .pipe(coveralls());
});

gulp.task('browserify', ['clean:dist'], function () {
  var b = browserify().require('./' + pkg.main, {expose: pkg.name});

  return b.bundle()
    .pipe(source(pkg.name + '.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./dist/'))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify()).on('error', gutil.log)
    .pipe(rename(pkg.name + '.min.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build', ['browserify']);
gulp.task('default', ['build']);
