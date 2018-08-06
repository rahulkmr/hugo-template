import gulp from 'gulp'
import sourcemaps from 'gulp-sourcemaps'
import postcss from 'gulp-postcss'
import postcssPresetEnv from 'postcss-preset-env'
import postcssImport from 'postcss-import'
import constants from './constants'
import BrowserSync from 'browser-sync'

const browserSync = BrowserSync.create()

gulp.task('styles', () =>
    gulp.src('./src/styles/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([postcssImport(), postcssPresetEnv()]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(`./${constants.buildPath}/styles`))
)