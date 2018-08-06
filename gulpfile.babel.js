import gulp from 'gulp'
import sourcemaps from 'gulp-sourcemaps'
import postcss from 'gulp-postcss'
import postcssPresetEnv from 'postcss-preset-env'
import postcssImport from 'postcss-import'
import constants from './constants'
import BrowserSync from 'browser-sync'

const browserSync = BrowserSync.create()
const stylesGlob = './src/styles/**/*.css'


gulp.task('develop', ['styles'], (done) => runServer(done))
gulp.task('default', ['develop'])


gulp.task('styles', () =>
    gulp.src(stylesGlob)
        .pipe(sourcemaps.init())
        .pipe(postcss([postcssImport(), postcssPresetEnv()]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(`./${constants.buildPath}/styles`))
)


const runServer = () => {
    browserSync.init({
        baseDir: constants.buildPath
    })
    gulp.watch(stylesGlob, ['styles'])
}