var gulp = require('gulp');
var jshint = require('gulp-jshint');
var apidoc = require('gapidoc');
var nodemon = require('gulp-nodemon');
var ignore = require('gulp-ignore');
var rimraf = require('gulp-rimraf');
var src_files = ['*.{js,json}', 'bin/*', 'config/**/*.{js,json}', 'controllers/**/*.{js,json}', 'helpers/**/*.{js,json}', 'models/**/*.{js,json}', 'routes/**/*.{js,json}', 'schemas/**/*.{js,json}', 'services/**/*.{js,json}'];
//
process.setMaxListeners(0);
// jslint task for source files and tests that don't require database connection
gulp.task('jslint', function () {
    return gulp.src(src_files).pipe(jshint({
        'undef': true,
        'unused': false,
        'node': true,
        'nomen': true,
        'plusplus': false,
        'latedef': true
    })).pipe(jshint.reporter('jshint-stylish'));
});
// apidoc task that generates route documentation
gulp.task('apidoc', function () {
    apidoc.exec({
        src: "routes/",
        dest: "public/doc/"
    });
});
// watch files changes
gulp.task('watch', function () {
    gulp.watch(src_files, ['jslint']);
});
// nodemon watch runs and refreshes the server when a file is modified
gulp.task('nodemon', function () {
    nodemon({
        script: 'index.js',
        ext: 'js html json',
        watch: ['**/*'],
        env: {
            'NODE_ENV': 'development'
        }
    });
});