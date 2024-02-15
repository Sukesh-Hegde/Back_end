import gulp from 'gulp';
import concat from 'gulp-concat'

gulp.task('default', () => {
    // define task
    return gulp.src("src/files/*")
        .pipe(concat("all.js"))
        .pipe(gulp.dest("dest/files"))
});