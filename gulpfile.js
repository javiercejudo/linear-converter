/*jshint node:true */

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

function tmpBrowserify(pkgName) {
  var pkgPath = './node_modules/' + pkgName + '/src/' + pkgName + '.js';
  var b = browserify().require(pkgPath, {expose: pkgName});

  return b.bundle()
    .pipe(source(pkgName))
    .pipe(buffer())
    .pipe(gulp.dest('./tmp/'));
}

function browserifyLc(dest) {
  var b = browserify().require('./' + pkg.main, {expose: pkg.name});

  return b.bundle()
    .pipe(source(pkg.name + '.js'))
    .pipe(buffer())
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest(dest))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify()).on('error', gutil.log)
    .pipe(rename(pkg.name + '.min.js'))
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest(dest))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dest));
}

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

gulp.task('browserify-arbitrary-precision', [], function() {
  return tmpBrowserify('arbitrary-precision');
});

gulp.task('browserify-linear-presets', [], function() {
  return tmpBrowserify('linear-presets');
});

gulp.task('browserify-bigjs-adapter', [], function() {
  return tmpBrowserify('bigjs-adapter');
});

gulp.task('browserify-floating-adapter', [], function() {
  return tmpBrowserify('floating-adapter');
});

gulp.task('test', ['clean:coverage', 'instrument'], function() {
  return gulp.src(['test/iojs/*.js'])
    .pipe(mocha())
    .pipe(istanbul.writeReports());
});

gulp.task('coveralls', function() {
  gulp.src('coverage/lcov.info')
    .pipe(coveralls());
});

gulp.task('browserify', ['clean:dist'], function() {
  return browserifyLc('./dist/');
});

var devDeps = [
  'browserify-linear-presets',
  'browserify-bigjs-adapter',
  'browserify-floating-adapter',
  'browserify-arbitrary-precision'
];

gulp.task('dev', devDeps, function() {
  return browserifyLc('./tmp/');
});

gulp.task('build', ['browserify']);
gulp.task('default', ['build']);
