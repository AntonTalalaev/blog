const { src, dest, series, parallel } = require('gulp');


const postcss = require('gulp-postcss');         // run plugins
const cssnano = require('cssnano');              // will minimize file
const autoprefixer = require('autoprefixer');    // will convert css into browser specific css
const concat = require('gulp-concat');           // will concat files 
const sourcemaps = require('gulp-sourcemaps');   // package to map source file and minimized
const minifyInline = require('gulp-minify-inline');
const imagemin = require('gulp-imagemin');


// HTML tasks
function htmlTask() {
    return src('src/*.html')
        .pipe(dest('dist'));
}

// scripts tasks 
function scriptsTask() {
    return src('src/scripts/*.js')
        .pipe(sourcemaps.init())
        .pipe(minifyInline())
        .pipe(sourcemaps.write())
        .pipe(dest('dist/scripts'));
}

// styles tasks 
function stylesTask() {
    return src('src/styles/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write())
        .pipe(dest('dist/styles'));
}

// images bg tasks 
function imagesTask() {
    return src([
        'src/images/*.png',
        'src/images/*.jpg',
        'src/images/posts/*.png',
        'src/images/posts/*.jpg'
    ], { base: 'src/images/' })
        .pipe(imagemin())
        .pipe(dest('dist/images/'));
}

function imagesGIFTask() {
    return src('src/images/*.gif')
        .pipe(dest('dist/images/'));
}

// styles tasks 
function vendorTask() {
    return src([
        'src/vendor/bootstrap/css/*min*',
        'src/vendor/bootstrap/js/*min*',
        'src/vendor/fontawesome/css/*min*',
        'src/vendor/fontawesome/webfonts/*',
        'src/vendor/jquery/*min*',
    ], { base: 'src/vendor/' })
        .pipe(dest('dist/vendor/'));
}

// to make tasks available in gulp command 
exports.html = htmlTask;
exports.scripts = scriptsTask;
exports.styles = stylesTask;
exports.images = series(imagesTask, imagesGIFTask);
exports.imagesGIF = imagesGIFTask;
exports.vendor = vendorTask;

exports.default = series(parallel(htmlTask, scriptsTask, stylesTask, vendorTask, imagesTask, imagesGIFTask));