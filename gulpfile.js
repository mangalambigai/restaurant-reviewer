var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var jasmine = require('gulp-jasmine-phantom');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('default', ['copy-html', 'copy-images', 'styles', 'lint', 'scripts', 'copy-data'], function() {
	gulp.watch('js/**/*.js', ['lint', 'scripts']);
	gulp.watch('index.html', ['copy-html']);
	gulp.watch('partials/*.html', ['copy-html']);
	gulp.watch('css/*.css', ['styles']);
	gulp.watch('data/*.json', ['copy-data']);
	gulp.watch('./dist/index.html').on('change', browserSync.reload);
	gulp.watch('./dist/partials/*.html').on('change', browserSync.reload);
	gulp.watch('./dist/js/**/*.js').on('change', browserSync.reload);

	browserSync.init({
		server: './dist'
	});
});

gulp.task('dist', [
	'copy-html',
	'copy-images',
	'styles',
	'lint',
	'scripts-dist'
]);

gulp.task('scripts', function() {
	gulp.src('js/**/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-dist', function() {
	gulp.src('js/**/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('copy-html', function() {

	gulp.src('./index.html')
		.pipe(gulp.dest('./dist'));
	gulp.src('partials/*.html')
		.pipe(gulp.dest('./dist/partials'));
});

gulp.task('copy-data', function() {
	gulp.src('data/*.json')
		.pipe(gulp.dest('dist/data'));
});

gulp.task('copy-images', function() {
	gulp.src('img/*')
		.pipe(gulp.dest('dist/img'));
});

gulp.task('styles', function() {
	gulp.src('css/**/*.css')
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});

gulp.task('lint', function () {
	return gulp.src(['js/**/*.js'])
		// eslint() attaches the lint output to the eslint property
		// of the file object so it can be used by other modules.
		.pipe(eslint())
		// eslint.format() outputs the lint results to the console.
		// Alternatively use eslint.formatEach() (see Docs).
		.pipe(eslint.format())
		// To have the process exit with an error code (1) on
		// lint error, return the stream and pipe to failOnError last.
		.pipe(eslint.failOnError());
});

gulp.task('tests', function () {
	gulp.src('tests/spec/extraSpec.js')
		.pipe(jasmine({
			integration: true,
			vendor: 'js/**/*.js'
		}));
});

gulp.task('ngdocs', [], function () {
  var gulpDocs = require('gulp-ngdocs');
  return gulp.src('js/*.js')
    .pipe(gulpDocs.process())
    .pipe(gulp.dest('./docs'));
});
