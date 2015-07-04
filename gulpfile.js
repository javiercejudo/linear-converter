/*jshint node:true */

var decimalDep = process.env.DECIMAL ? process.env.DECIMAL : 'big.js';

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
var header = require('gulp-header');

var pkg = require('./package.json');
var banner = ['/**',
  ' * <%= pkg.name %> - Copyright ' + new Date().getFullYear() + ' <%= pkg.author %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */\n'
].join('\n');

gulp.task('clean:coverage', function(cb) {
  del(['coverage'], cb);
});

gulp.task('clean:dist', function(cb) {
  del(['dist'], cb);
});

gulp.task('instrument', function() {
  return gulp.src(['src/linear-converter.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('browserify-decimal', [], function() {
  var b = browserify()
    .require('./node_modules/' + decimalDep + '/' + decimalDep, {expose: decimalDep});

  return b.bundle()
    .pipe(source(decimalDep))
    .pipe(buffer())
    .pipe(gulp.dest('./tmp/'));
});

gulp.task('browserify-linear-presets', [], function() {
  var presets = 'linear-presets';

  var b = browserify()
    .require('./node_modules/' + presets + '/src/' + presets + '.js', {expose: presets});

  return b.bundle()
    .pipe(source(presets))
    .pipe(buffer())
    .pipe(gulp.dest('./tmp/'));
});

gulp.task('test', ['clean:coverage', 'instrument', 'browserify-decimal', 'browserify-linear-presets'], function() {
  return gulp.src(['test/iojs/*.js'])
    .pipe(mocha())
    .pipe(istanbul.writeReports());
});

gulp.task('coveralls', function() {
  gulp.src('coverage/lcov.info')
    .pipe(coveralls());
});

gulp.task('browserify', ['clean:dist'], function() {
  var b = browserify()
    .require('./' + pkg.main, {expose: pkg.name});

  Object.keys(pkg.optionalDependencies || {}).forEach(function(optionalDep) {
    b.ignore(optionalDep);
  });

  return b.bundle()
    .pipe(source(pkg.name + '.js'))
    .pipe(buffer())
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest('./dist/'))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify()).on('error', gutil.log)
    .pipe(rename(pkg.name + '.min.js'))
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest('./dist/'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build', ['browserify']);
gulp.task('default', ['build']);
