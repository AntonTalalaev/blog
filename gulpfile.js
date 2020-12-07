const { src, dest, series, parallel } = require('gulp');

// HTML tasks
function htmlTask() {
    return src('src/*.html')
        .pipe(dest('dist'));
}

// scripts tasks 
function scriptsTask() {
    return src('src/scripts/*.js')
        .pipe(dest('dist/scripts'));
}

// styles tasks 
function stylesTask() {
    return src('src/styles/*.css')
        .pipe(dest('dist/styles'));
}

// images bg tasks 
function imagesBgTask() {
    return src('src/images/*')
        .pipe(dest('dist/images/'));
}

// images posts tasks 
function imagesPostsTask() {
    return src('src/images/posts/*')
        .pipe(dest('dist/images/posts/'));
}

// styles tasks 
function vendorTask() {
    return src([
        'src/vendor/bootstrap/css/*',
        'src/vendor/bootstrap/js/*',
        'src/vendor/fontawesome/css/*',
        'src/vendor/fontawesome/webfonts/*',
        'src/vendor/jquery/*',
    ], { base: 'src/vendor/' })
        .pipe(dest('dist/vendor/'));
}

// to make tasks available in gulp command 
exports.html = htmlTask;
exports.scripts = scriptsTask;
exports.styles = stylesTask;
exports.imagesBg = imagesBgTask;
exports.imagesPosts = imagesPostsTask;
exports.vendor = vendorTask;
exports.default = series(parallel(htmlTask, scriptsTask, stylesTask, imagesBgTask, imagesPostsTask, vendorTask));

