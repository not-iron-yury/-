const gulp = require('gulp');

// Tasks
require('./gulp/dev.js');		// gulp
require('./gulp/docs.js');		// gulp docs
require('./gulp/fonts.js');		// gulp fonts


gulp.task(
	'default',
	gulp.series(
		'clean:dev',
		gulp.parallel('html:dev', 'sass:dev', 'images:dev', 'fonts:dev', 'files:dev', 'js:dev'),
		gulp.parallel('server:dev', 'watch:dev')
	)
);

gulp.task(
	'docs',
	gulp.series(
		'clean:docs',
		gulp.parallel('html:docs', 'sass:docs', 'images:docs', 'fonts:docs', 'files:docs', 'js:docs'),
		gulp.parallel('server:docs')
	)
);

gulp.task(
	'fonts',
	gulp.series('woff2', 'woff', 'del-ttf')
);