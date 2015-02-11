// Import necessary modules
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint');
    //plumber = require('gulp-plumber');

// Instead of plumber, simply log error to console
function errorLog(error){
    console.log(error);
    this.emit('end');
}

// Minify JS Scripts - Compress and concat JS files
gulp.task('js_minify', function(){
    gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(uglify())
        .pipe(concat('min.js'))
        .on('error', errorLog)
        .pipe(gulp.dest('build/js'));
});

// Watch changes in JS and CSS files and run tasks on save
gulp.task('watch', function(){
    gulp.watch('js/**/*.js', ['js_minify']);
});

// Set up the default task to run when 'gulp' is called
gulp.task('default', ['js_minify', 'watch']);
