const { src, dest, watch, parallel } = require('gulp');

const scss         = require('gulp-sass')(require('sass'));
const concat       = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify       = require('gulp-uglify');
// const imagemin     = require('gulp-imagemin');
const browserSync  = require('browser-sync').create();


function browsersync(){
    browserSync.init({
        server: {
            baseDir:'app/'
        },
        notofy:false
    })
}

function styles() {
    return src('app/scss/style.scss',)
    .pipe(scss({outputStyle:'compressed'}))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
        overrideBrowserslist:['last 10 versions'],
        grid:true

    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
    

}

function scripts (){
    return src ([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/slick-carousel/slick/slick.js',
        'app/js/main.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}
// function images(){
//     return src('app/images/**/*.*')
//     .pipe(imagemin())
//     .pipe(dest('dist/images'))

// }

function build(){
    return src ([
        'app/**/*.html',
        'app/css/style.min.css',
        'app/js/main.min.js'

    ])
    .pipe(dest('dist'))

}


function watching(){
    watch(['app/scss/**/*.scss'],styles);
    watch(['app/js/**/*.js', '!app/js/main.min.js']);
    watch(['app/**/*.html']).on('change' , browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
// exports.images = images;
exports.build=build;


exports.default = parallel(styles, scripts, watching,browsersync);
