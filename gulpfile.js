const gulp = require('gulp')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const terser = require('gulp-terser')
const babel = require('gulp-babel')
const del = require('del')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const image = require('gulp-image')

const cssFiles = [
  './src/assets/fonts/fonts.css',
  './src/assets/css/reset.css',
  './src/assets/css/grid.css',
  './src/assets/css/style.css',
  './src/assets/css/media.css'
]
const img = () => (
  gulp.src('./src/assets/img/**/*')
    .pipe(image())
    .pipe(gulp.dest('./build/img'))
)

const icons = () => (
  gulp.src('./src/assets/icons/**/*')
    .pipe(image())
    .pipe(gulp.dest('./build/icons'))
)

const scss = () => (
  gulp.src('./src/assets/css/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./src/assets/css'))
    .pipe(browserSync.stream())
)

const styles = () => (
  gulp.src(cssFiles)
    .pipe(concat('all.css'))
    .pipe(autoprefixer({
      browsers: ['> 0.1%'],
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream())
)

const jsFiles = [
  './src/scripts/*.js'
]

const scripts = () => (
  gulp.src(jsFiles)
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(concat('all.js'))
    .pipe(terser())
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream())
)

const watch = () => {
  browserSync.init({
    server: {
      baseDir: './',
    },
    tunnel: true
  });
  gulp.watch('./src/assets/css/**/*.scss', scss)
  gulp.watch('./src/assets/css/**/*.css', styles)
  gulp.watch('./src/scripts/**/*.js', scripts)
  gulp.watch('./*.html').on('change', browserSync.reload)
}

const clean = () => del(['build/*'])


gulp.task('img', img)
gulp.task('scss', scss)
gulp.task('styles', styles)
gulp.task('scripts', scripts)
gulp.task('watch', watch)
gulp.task('clean', clean)

gulp.task('build', gulp.series(clean, scss, img, icons,
  gulp.parallel(styles, scripts)
))

gulp.task('default', gulp.series('build', 'watch'))