// Import necessary modules
// gulp-plumber is not needed since we're implementing
// our own error handling
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    mincss = require('gulp-minify-css');

// Globals for easier management
var JS_SEARCH    = 'js/*.js',
    JS_BUILD_DIR = 'build/js',
    JS_MIN_FILE  = 'min.js';

var CSS_SEARCH    = 'css/*.css',
    CSS_BUILD_DIR = 'build/css',
    CSS_MIN_FILE  = 'min.css';

// Instead of plumber, simply log error to console
function errorLog(error){
    console.log(error);
    this.emit('end');
}

// Javascript
// Lint, Compress and Concat JS files into one file
gulp.task('js_task', function(){
    gulp.src(JS_SEARCH)
        .pipe(jshint())
        .pipe(uglify())
        .pipe(concat(JS_MIN_FILE))
        .on('error', errorLog)
        .pipe(gulp.dest(JS_BUILD_DIR));
});

// CSS
// Minify and Concat CSS files into one file
gulp.task('css_task', function(){
    gulp.src(CSS_SEARCH)
        .pipe(mincss())
        .pipe(concat(CSS_MIN_FILE))
        .pipe(gulp.dest(CSS_BUILD_DIR))
});

// Watch changes in JS files and run tasks on save
gulp.task('watch', function(){
    gulp.watch(JS_SEARCH, ['js_task']);
    gulp.watch(CSS_SEARCH, ['css_task']);
});

// Set up the default task to run when 'gulp' is called
gulp.task('default', ['js_task', 'css_task', 'watch']);
