let gulp        = require('gulp'),
    browserify  = require('browserify'),
    streamify   = require('gulp-streamify'),
    del         = require('del'),
    preprocess  = require('gulp-preprocess'),
    source      = require('vinyl-source-stream'),
    concatCss   = require('gulp-concat-css'),
    sourceFile  = './app/js/app.js',
    destFolder  = './dist/',
    destFile    = 'LT.js';

gulp.task('browserify', function() {
    let bundler = browserify(sourceFile)
        .bundle()
        .pipe(source(destFile))
        .pipe(streamify(preprocess()));

    bundler = bundler.pipe(gulp.dest(destFolder + 'js/'));

    return bundler;
});

gulp.task('catCss', function() {
    gulp.src('./app/css/**/*.css')
        .pipe(concatCss('bundle.css'))
        .pipe(gulp.dest(destFolder + 'css/'));
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
});

gulp.task('default', ['copy', 'browserify', 'catCss']);