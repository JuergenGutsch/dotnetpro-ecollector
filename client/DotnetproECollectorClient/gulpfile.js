var gulp = require('gulp');

gulp.task('copy:jquery', function () {
    gulp.src([
        'node_modules/jquery/dist/*.js'
    ]).pipe(gulp.dest('./src/assets/jquery'));
});
gulp.task('copy:bootstrap', function () {
    gulp.src([
        'node_modules/bootstrap/dist/**/*.*'
    ]).pipe(gulp.dest('./src/assets/bootstrap'));
});

gulp.task('default', [
    'copy:jquery',
    'copy:bootstrap'
]);
