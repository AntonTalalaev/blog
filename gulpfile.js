const { src, dest, series, parallel } = require('gulp');


const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const minifyInline = require('gulp-minify-inline');
const imagemin = require('gulp-imagemin');


// HTML tasks
function htmlTask() {
    return src('src/*.html')
        .pipe(dest('dist'));
}

// scripts tasks 
function scriptsTask() {
    return src([
        'src/scripts/*.js',
        'src/vendor/jquery/jquery.js',
        'src/vendor/bootstrap/js/bootstrap.bundle.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(minifyInline())
        .pipe(sourcemaps.write())
        .pipe(concat('all.js'))
        .pipe(dest('dist/scripts'));
}

// styles tasks 
function stylesTask() {
    return src([
        'src/vendor/bootstrap/css/bootstrap.css',
        'src/vendor/clean-blog/clean-blog.css',
        'src/styles/main.css',
    ])
        .pipe(sourcemaps.init())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write())
        .pipe(concat('all.css'))
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

// GIF tasks
function imagesGIFTask() {
    return src('src/images/*.gif')
        .pipe(dest('dist/images/'));
}


// to make tasks available in gulp command 
exports.html = htmlTask;
exports.scripts = scriptsTask;
exports.styles = stylesTask;
exports.images = series(imagesTask, imagesGIFTask);
exports.imagesGIF = imagesGIFTask;

exports.default = series(parallel(htmlTask, scriptsTask, stylesTask, imagesTask, imagesGIFTask));