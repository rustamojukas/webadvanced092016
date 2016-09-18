var gulp = require("gulp"),
    connect = require("gulp-connect"),
    opn = require("opn"),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    autoprefixer = require('gulp-autoprefixer'),
    del = require('del');

// Local server start
gulp.task('connect', function() {
  connect.server({
    root: './app/',
    livereload: true,
    port: 8888
  });
  opn('http://localhost:8888');
});

// Work with vendor.js
gulp.task('venjs', function() {
  return gulp.src('./app/bower/jquery/dist/jquery.min.js')
  .pipe(gulp.dest('./app/js/'));
})

// Work with PUG/JADE
gulp.task('pug', function() {
  return gulp.src('./app/templates/pages/*.pug')
  .pipe(pug({pretty: true}))
  .pipe(gulp.dest('./app/'))
  .pipe(connect.reload());
})

// Work with SASS
gulp.task('sass', function() {
	return gulp.src('./app/sass/*.scss')
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer('last 10 versions'))
		.pipe(gulp.dest('./app/css'))
    .pipe(connect.reload());
});

// Work with JS
gulp.task('js', function () {
  gulp.src('./app/js/*.js')
    .pipe(connect.reload());
});

// Watching
gulp.task('watch', function () {
  gulp.watch(['./app/templates/**/*.pug'], ['pug']);
  gulp.watch(['./app/sass/**/*.scss'], ['sass']);
  gulp.watch(['./app/js/*.js'], ['js']);
});

// Remove dist/
gulp.task('remove', function () {
  del.sync('dist/');
});

// Build project
gulp.task('build', ['remove', 'venjs', 'pug', 'sass'], function () {
  var buildCss = gulp.src('app/css/**/*')
      .pipe(gulp.dest('dist/css/'));

  var buildJs = gulp.src('app/js/**/*')
      .pipe(gulp.dest('dist/js/'));

  var buildFonts = gulp.src('app/fonts/**/*')
      .pipe(gulp.dest('dist/fonts/'));

  var buildImage = gulp.src('app/img/**/*')
      .pipe(gulp.dest('dist/img/'));

  var buildHtml = gulp.src('app/*.html')
      .pipe(gulp.dest('dist/'));
});

// Default task
gulp.task('default', ['venjs', 'pug', 'sass', 'connect', 'watch']);
