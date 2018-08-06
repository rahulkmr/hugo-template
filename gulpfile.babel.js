import gulp from 'gulp'
import flatten from 'gulp-flatten'
import sourcemaps from 'gulp-sourcemaps'
import postcss from 'gulp-postcss'
import postcssPresetEnv from 'postcss-preset-env'
import postcssImport from 'postcss-import'
import BrowserSync from 'browser-sync'
import webpack from 'webpack'
import logger from 'fancy-log'
import { spawn } from 'child_process'

import constants from './constants'
import webpackConfig from './webpack.config.js'


const browserSync = BrowserSync.create()
const stylesGlob = './src/styles/**/*.css'
const scriptsGlob = './src/scripts/**/*.js'
const fontsGlob = './src/styles/**/*'
const hugoRoot = './site'
const hugoGlob = `./${hugoRoot}/**/*`
const hugoDefaultArgs = ['-d', `../${constants.buildPath}`, '-s', 'site', '-v']
const hugoPreviewArgs = hugoDefaultArgs.concat(['--buildDrafts', '--buildFuture'])
const assetsTasks = ['scripts', 'styles', 'fonts']


gulp.task('develop', assetsTasks, (done) => {
    runHugo(done, hugoDefaultArgs)
    return runServer(done)
})
gulp.task('develop-preview', assetsTasks, (done) => {
    runHugo(done, hugoPreviewArgs)
    return runServer(done)
})
gulp.task('build', assetsTasks, (done) => runHugo(done, hugoDefaultArgs))
gulp.task('build-preview', assetsTasks, (done) => runHugo(done, hugoPreviewArgs))
gulp.task('default', ['develop'])



gulp.task('hugo', (done) => runHugo(done, hugoDefaultArgs))
gulp.task('hugo-preview', (done) => runHugo(done, hugoPreviewArgs))


gulp.task('styles', () =>
    gulp.src(stylesGlob)
        .pipe(sourcemaps.init())
        .pipe(postcss([postcssImport(), postcssPresetEnv()]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(`./${constants.buildPath}/styles`))
        .pipe(browserSync.stream())
)


gulp.task('scripts', (done) => {
  webpack(webpackConfig, (error, stats) => {
      if (error)
          throw new Error(error)
    logger.info("[webpack]", stats.toString({
        colors: true,
        progress: true
    }))
    browserSync.reload()
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
        server: {
            baseDir: constants.buildPath
        }
    })
    gulp.watch(stylesGlob, ['styles'])
    gulp.watch(scriptsGlob, ['scripts'])
    gulp.watch(fontsGlob, ['fonts'])
    gulp.watch(hugoGlob, ['hugo'])
}


const runHugo = (done, args) => {
  return spawn('hugo', args, {stdio: "inherit"}).on("close", (returnCode) => {
    if (returnCode === 0) {
      browserSync.reload()
      done()
    } else {
      browserSync.notify("Hugo build failed.")
      done("Hugo build failed.")
    }
  })
}