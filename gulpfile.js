let gulp = require('gulp'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    maincss = require('gulp-clean-css');

gulp.task('scripts', () => {
    return gulp.src('js/**/*.js')
        .pipe(concat('script.js'))
        .pipe(gulp.dest('dist/script'))
        .pipe(rename('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/script'));
});
gulp.task('css',() => {
    return gulp.src('css/**/*.css')
    .pipe(concat('main.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(maincss())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('default', ['browser', 'scripts','css']);
gulp.task('browser', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
gulp.watch('./js/**/*.js').on('change',
    () => {
        return gulp.src('js/**/*.js')
            .pipe(concat('script.js'))
            .pipe(gulp.dest('dist/script'))
            .pipe(rename('script.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/script'));

    }
);
gulp.watch(['index.html', 'js/app.js','css/main.css'])
    .on('change', () => {
        browserSync.reload();
    });

    gulp.watch('./css/**/*.css').on('change',
    () => {
        return gulp.src('css/**/*.css')
            .pipe(concat('main.css'))
            .pipe(gulp.dest('dist/css'))
            .pipe(rename('main.min.css'))
            .pipe(maincss())
            .pipe(gulp.dest('dist/css'));

    }
);

