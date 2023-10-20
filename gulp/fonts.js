const gulp = require('gulp');
const clean = require('gulp-clean');
const ttf2woff2 = require('gulp-ttf2woff2');
const ttf2woff = require('gulp-ttf2woff')

gulp.task('woff2', function () {
	return gulp
		.src('./src/fonts/**/*.ttf')
		.pipe(ttf2woff2())
		.pipe(gulp.dest('./src/fonts/'));
});

gulp.task('woff', function () {
	return gulp
		.src('./src/fonts/**/*.ttf')
		.pipe(ttf2woff())
		.pipe(gulp.dest('./src/fonts/'));
});

gulp.task('del-ttf', function () {
	return gulp
		.src('./src/fonts/**/*.ttf')
		.pipe(clean())
});