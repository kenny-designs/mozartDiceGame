var gulp        = require('gulp'),
    browserify  = require('browserify'),
    del         = require('del'),
    preprocess  = require('gulp-preprocess');

var destFolder = './dist/';

gulp.task('browserify', function() {
    console.log('Hello World!');
});

gulp.task('copy', function() {
    gulp.src(['app/*', '!app/*.html']).pipe(gulp.dest(destFolder));
    gulp.src('app/*.html')            .pipe(preprocess()).pipe(gulp.dest(destFolder));
    gulp.src('app/js/**/*')           .pipe(gulp.dest(destFolder + 'js/'));
    gulp.src('app/css/**/**')         .pipe(gulp.dest(destFolder + 'css/'));
    gulp.src('app/img/**/*')          .pipe(gulp.dest(destFolder + 'img/'));
    gulp.src('app/audio/**/*')        .pipe(gulp.dest(destFolder + 'audio/'));
});

gulp.task('clean', function() {
    del(destFolder + '/**/*');
})

gulp.task('default', ['copy', 'browserify']);