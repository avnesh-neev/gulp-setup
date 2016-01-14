// //////////////////////////////////////////////////////////////////
// Required
// //////////////////////////////////////////////////////////////////
var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	del = require('del'),
	plumber = require('gulp-plumber');



// //////////////////////////////////////////////////////////////////
// Scripts Task
// //////////////////////////////////////////////////////////////////
gulp.task('scripts', function() {
	gulp.src(['./js/**/*.js', '!./js/**/*.min.js'])
		.pipe(rename({suffix:'.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('./js'))
		.pipe(reload({stream: true}));
});



// //////////////////////////////////////////////////////////////////
// Sass Task
// //////////////////////////////////////////////////////////////////
gulp.task('sass', function () {
  gulp.src('./scss/style.scss')
  	.pipe(plumber())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(reload({stream: true}));
});


// //////////////////////////////////////////////////////////////////
// Html Task
// //////////////////////////////////////////////////////////////////
gulp.task('html', function() {
	gulp.src('./**/*.html')
	.pipe(reload({stream: true}));	
});


// //////////////////////////////////////////////////////////////////
// Build Task
// //////////////////////////////////////////////////////////////////

//Clear oul All files and folders from build folder
gulp.task('build:clearfolder', function(cb) {
	del(['build/**'], cb);
}	);

// Task for creating build directory for all files
gulp.task('build:copy', function() {
	return gulp.src('./**/*/')
	.pipe(gulp.dest('build'))	
});

//Task to remove unwanted build files 
//list all files and directories here that you don't want to include in build
gulp.task('build:remove', ['build:copy'], function(cb) {
	del([
			'build/scss/',
			'build/js/!(*.min.js)'
		], cb);
});

gulp.task('build', ['build:copy', 'build:remove']);



// //////////////////////////////////////////////////////////////////
// Browser-Sync Task
// //////////////////////////////////////////////////////////////////
gulp.task('browser-sync', function () {
  browserSync({
  	server:{baseDir: './'}
  })

});

// //////////////////////////////////////////////////////////////////
// Watch Task
// //////////////////////////////////////////////////////////////////
gulp.task('watch', function () {
  gulp.watch('./js/**/*.js', ['scripts']);
  gulp.watch('./scss/*.scss', ['sass']);
  gulp.watch('./**/*.html', ['html']);

});




// //////////////////////////////////////////////////////////////////
// Default Task
// //////////////////////////////////////////////////////////////////
gulp.task('default', ['scripts', 'sass', 'html', 'browser-sync', 'watch']);
