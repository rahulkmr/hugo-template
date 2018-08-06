import gulp from 'gulp'
import flatten from 'gulp-flatten'
import sourcemaps from 'gulp-sourcemaps'
import postcss from 'gulp-postcss'
import postcssPresetEnv from 'postcss-preset-env'
import postcssImport from 'postcss-import'
import BrowserSync from 'browser-sync'
import webpack from 'webpack'
import logger from 'fancy-log'

import constants from './constants'
import webpackConfig from './webpack.config.js'


const browserSync = BrowserSync.create()
const stylesGlob = './src/styles/**/*.css'
const fontsGlob = './src/styles/**/*'


gulp.task('develop', ['styles'], (done) => runServer(done))
gulp.task('default', ['develop'])


gulp.task('styles', () =>
    gulp.src(stylesGlob)
        .pipe(sourcemaps.init())
        .pipe(postcss([postcssImport(), postcssPresetEnv()]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(`./${constants.buildPath}/styles`))
)


gulp.task('scripts', (done) => {
  webpack(webpackConfig, (error, stats) => {
      if (error)
          throw new Error(error)
    logger.info("[webpack]", stats.toString({
        colors: true,
        progress: true
    }))
    done()
  })
})


gulp.task('fonts', () => (
  gulp.src(fontsGlob)
    .pipe(flatten())
    .pipe(gulp.dest(`./${constants.buildPath}/fonts`))
    .pipe(browserSync.stream())
))

const runServer = () => {
    browserSync.init({
        baseDir: constants.buildPath
    })
    gulp.watch(stylesGlob, ['styles'])
}