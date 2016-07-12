var gulp = require('gulp');

gulp.task('default', function () {
    // place code for your default task here
});

gulp.task('copy_deps', function () {
    gulp.src([
        'node_modules/@angular/**/*.js',
        'node_modules/angular2-in-memory-web-api/*.js',
        'node_modules/rxjs/**/*.js',
        'node_modules/systemjs/dist/*.js',
        'node_modules/zone.js/dist/*.js',
        'node_modules/core-js/client/*.js',
        'node_modules/reflect-metadata/reflect.js',
        'node_modules/jquery/dist/*.js',
        'node_modules/bootstrap/dist/**/*.*'
    ]).pipe(gulp.dest('./wwwroot/libs'));
});
