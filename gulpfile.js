var gulp = require('gulp');
var concat = require('gulp-concat');

var taskListing = require('gulp-task-listing');
gulp.task('help', taskListing);

var size = require('gulp-size');

var tag_version = require('gulp-tag-version');
gulp.task('tag', function() {
    return gulp.src(['./package.json']).pipe(tag_version());
});

// COPY IMAGES
gulp.task('copy', function() {
    return gulp.src('./src/img/**')
        .pipe(size())
        .pipe(gulp.dest('assets/img/'));
});

gulp.task('copy-dependencies', function() {

    gulp.src('./node_modules/bootstrap-select/dist/js/*.min.js')
        .pipe(size())
        .pipe(gulp.dest('assets/js/'));
    gulp.src('./node_modules/bootstrap-select/dist/css/*.min.css')
        .pipe(size())
        .pipe(gulp.dest('assets/css/'));

    gulp.src('./node_modules/bootstrap-less/js/bootstrap.min.js')
        .pipe(size())
        .pipe(gulp.dest('assets/js/'));

    gulp.src('./node_modules/bootstrap-less/fonts/*')
        .pipe(size())
        .pipe(gulp.dest('assets/fonts/'));

})

// LESS
var less = require('gulp-less');
var rename = require('gulp-rename');
var compressor = require('gulp-compressor');
var strip = require('gulp-strip-comments');

gulp.task('less', function() {

    return gulp.src('./src/less/style.less')
        .pipe(less({
            paths: [
                '.',
                './node_modules/bootstrap-less'
            ]
        }))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(strip())
        .pipe(size())
        // .pipe(compressor())
        .pipe(gulp.dest('./assets/css'));
});

gulp.task('js', function () {

    return gulp.src('./src/js/*.js')
        .pipe(strip())
        .pipe(concat('app.js'))
        .pipe(size())
        .pipe(compressor())
        .pipe(gulp.dest('./assets/js/'));

});

gulp.task('watch', function() {
    gulp.watch('./src/js/*.js', ['js']);
    gulp.watch('./src/less/**/*.less', ['less']);
});

// Default Task
gulp.task('default', ['copy', 'copy-dependencies', 'less', 'js']);