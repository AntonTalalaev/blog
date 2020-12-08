const { src, dest, series, parallel } = require('gulp');


const postcss = require('gulp-postcss');         // run plugins
const cssnano = require('cssnano');              // will minimize file
const autoprefixer = require('autoprefixer');    // will convert css into browser specific css
const concat = require('gulp-concat');           // will concat files 
const sourcemaps = require('gulp-sourcemaps');   // package to map source file and minimized
const minifyInline = require('gulp-minify-inline');



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



