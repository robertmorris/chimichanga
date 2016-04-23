const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
var flatten = require('gulp-flatten');

// clean the contents of the distribution directory
gulp.task('clean', function () {
  return del('public/**/*');
});

// TypeScript clean
gulp.task('clean-ts', function () {
  return del('public/app/*');
});

// Asset Clean
gulp.task('clean-assets', function () {
  return del(['public/*','!public/app','!public/lib']);
});

// Lib Clean
gulp.task('clean-libs', function () {
  return del('public/lib/*');
});

// TypeScript compile
gulp.task('compile', ['clean-ts'], function () {
  return gulp
    .src('src/client/app/**/*')
    .pipe(sourcemaps.init())          // <--- sourcemaps
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))      // <--- sourcemaps
    .pipe(gulp.dest('public/app'));
});

// copy dependencies
gulp.task('copy:libs', ['clean-libs'], function() {
  return gulp.src([
      'node_modules/es6-shim/es6-shim.min.js',
      'node_modules/systemjs/dist/system-polyfills.js',
      'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',   
      'node_modules/angular2/bundles/angular2-polyfills.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/rxjs/bundles/Rx.js',
      'node_modules/angular2/bundles/angular2.dev.js',
      'node_modules/angular2/bundles/router.dev.js'
    ])
    .pipe(gulp.dest('public/lib'))
});

// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', ['clean-assets'], function() {
  return gulp.src(['src/client/app/**/*', 'src/client/index.html', 'src/client/styles.css', '!src/client/app/**/*.ts'], { base : './' })
    .pipe(flatten())
    .pipe(gulp.dest('public'))
});

// lint typescript files
gulp.task('tslint', function() {
  return gulp.src('src/client/app/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});

gulp.task('watch', function() {
    gulp.watch('src/client/app/**/*.ts', ['tslint', 'compile'], reload);
    gulp.watch(['src/client/app/**/*', 'src/client/index.html', 'src/client/styles.css', '!src/client/app/**/*.ts'], ['copy:assets'], reload);
});

gulp.task('build', ['clean', 'tslint', 'compile', 'copy:libs', 'copy:assets']);
gulp.task('default', ['build']);