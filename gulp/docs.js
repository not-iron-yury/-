const gulp = require("gulp");

// HTML
const fileInclude = require("gulp-file-include");
const htmlclean = require("gulp-htmlclean");
const typograf = require("gulp-typograf");

// SASS
const sass = require("gulp-sass")(require("sass"));
const sassGlob = require("gulp-sass-glob");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const groupMedia = require("gulp-group-css-media-queries");

const server = require("gulp-server-livereload");
const clean = require("gulp-clean");
const fs = require("fs");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const babel = require("gulp-babel");
const changed = require("gulp-changed");
const removeHtmlComments = require("gulp-remove-html-comments");

gulp.task("clean:docs", function (done) {
	if (fs.existsSync("./docs/")) {
		return gulp
			.src("./docs/", { read: false })
			.pipe(clean({ force: true }));
	}
	done();
});

const fileIncludeSetting = {
	prefix: "@@",
	basepath: "@file",
};

const plumberNotify = (title) => {
	return {
		errorHandler: notify.onError({
			title: title,
			message: "Error <%= error.message %>",
			sound: false,
		}),
	};
};

gulp.task("html:docs", function () {
	return (
		gulp
			// .src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
			.src("./src/html/*.html")
			.pipe(changed("./docs/"))
			.pipe(removeHtmlComments())
			.pipe(plumber(plumberNotify("HTML")))
			.pipe(fileInclude(fileIncludeSetting))
			.pipe(typograf({ locale: ["ru", "en-US"] }))
			.pipe(htmlclean()) // минимизация кода
			.pipe(gulp.dest("./docs/"))
	);
});

gulp.task("sass:docs", function () {
	return gulp
		.src("./src/scss/*.scss")
		.pipe(changed("./docs/css/"))
		.pipe(plumber(plumberNotify("SCSS")))
		.pipe(autoprefixer())
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(csso())
		.pipe(groupMedia())
		.pipe(gulp.dest("./docs/css/"));
});

gulp.task("images:docs", function () {
	return gulp
		.src("./src/img/**/*")
		.pipe(changed("./docs/img/"))
		.pipe(gulp.dest("./docs/img/"));
});

gulp.task("fonts:docs", function () {
	return gulp
		.src("./src/fonts/**/*")
		.pipe(changed("./docs/fonts/"))
		.pipe(gulp.dest("./docs/fonts/"));
});

gulp.task("files:docs", function () {
	return gulp
		.src("./src/files/**/*")
		.pipe(changed("./docs/files/"))
		.pipe(gulp.dest("./docs/files/"));
});

gulp.task("js:docs", function () {
	return gulp
		.src("./src/js/*.js")
		.pipe(changed("./docs/js/"))
		.pipe(plumber(plumberNotify("JS")))
		.pipe(babel())
		.pipe(gulp.dest("./docs/js/"));
});

const serverOptions = {
	livereload: true,
	open: true,
};

gulp.task("server:docs", function () {
	return gulp.src("./docs/").pipe(server(serverOptions));
});
