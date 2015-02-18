// Import necessary modules
// gulp-plumber is not needed since we're implementing
// our own error handling
var gulp   = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    mincss = require('gulp-minify-css'),
    sass   = require('gulp-sass'),
    size   = require('gulp-size');

// Globals for easier management
var JS_SEARCH      = 'js/*.js',
    JS_BUILD_DIR   = 'build/js',
    JS_MIN_FILE    = 'min.js';
var CSS_SEARCH     = 'css/*.css',
    CSS_BUILD_DIR  = 'build/css',
    CSS_MIN_FILE   = 'minified_css.css';
var SASS_SEARCH    = 'scss/*.scss',
    SASS_BUILD_DIR = 'build/css',
    SASS_MIN_FILE  = 'minified_scss.css';

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
        .pipe(size({showFiles: true}))
        .pipe(concat(JS_MIN_FILE))
        .pipe(uglify())
        .on('error', errorLog)
        .pipe(gulp.dest(JS_BUILD_DIR))
        .pipe(size({showFiles: true}));
});

// CSS
// Minify and Concat CSS files into one file
gulp.task('css_task', function(){
    gulp.src(CSS_SEARCH)
        .pipe(size({showFiles: true}))
        .pipe(concat(CSS_MIN_FILE))
        .pipe(mincss())
        .pipe(gulp.dest(CSS_BUILD_DIR))
        .pipe(size({showFiles: true}));
});

// SASS
// Compile SASS
gulp.task('sass_task', function(){
    gulp.src(SASS_SEARCH)
        .pipe(size({showFiles: true}))
        .pipe(sass())
        .on('error', errorLog)
        .pipe(concat(SASS_MIN_FILE))
        .pipe(gulp.dest(SASS_BUILD_DIR))
        .pipe(size({showFiles: true}));
});

// Watch changes in files and run tasks on save
gulp.task('watch', function(){
    gulp.watch(JS_SEARCH, ['js_task']);
    gulp.watch(CSS_SEARCH, ['css_task']);
    gulp.watch(SASS_SEARCH, ['sass_task']);
});

// Set up the default task to run when 'gulp' is called
gulp.task('default', ['js_task', 'css_task', 'sass_task', 'watch']);
