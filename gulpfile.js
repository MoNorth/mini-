var gulp = require('gulp'),
    less = require('gulp-less');
 	// cssmin = require('gulp-minify-css');
gulp.task('Less', function () {
    gulp.src('public/less/*.less')
        .pipe(less())
        // .pipe(cssmin())
        .pipe(gulp.dest('public/stylesheets'));
});


gulp.task('watch', function () {
    gulp.watch('public/less/*.less', ['Less']);
});