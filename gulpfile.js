var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');
    //plumber = require('gulp-plumber');

function errorLog(error){
    console.log(error);
    this.emit('end');
}

// Minify JS Scripts
gulp.task('js_minify', function(){
    gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(concat('min.js'))
        .on('error', errorLog)
        .pipe(gulp.dest('build/js'));
});

// Watch changes in JS and CSS files
gulp.task('watch', function(){
    gulp.watch('js/**/*.js', ['js_minify']);
});

// Set up the default task to run when 'gulp' is called
gulp.task('default', ['js_minify', 'watch']);
