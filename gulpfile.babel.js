import gulp from 'gulp'
import flatten from 'gulp-flatten'
import del from 'del'
import imagemin from 'gulp-imagemin'
import sourcemaps from 'gulp-sourcemaps'
import postcss from 'gulp-postcss'
import BrowserSync from 'browser-sync'
import webpack from 'webpack'
import logger from 'fancy-log'
import { spawn } from 'child_process'

import webpackConfig from './webpack.config.js'


const browserSync = BrowserSync.create()
const buildDir = 'dist'
const stylesGlob = './assets/styles/**/*.css'
const scriptsGlob = './assets/scripts/**/*.js'
const fontsGlob = './assets/fonts/**/*'
const imagesGlob = './assets/images/**/*'
const hugoRoot = './site'
const hugoGlob = `./${hugoRoot}/**/*`
const assetsManifest = `./${hugoRoot}/data/assets.json`
const hugoDefaultArgs = ['--destination', `../${buildDir}`, '--source', 'site', '-v']
const hugoPreviewArgs = hugoDefaultArgs.concat(['--buildDrafts', '--buildFuture'])
const assetsTasks = ['clean', 'scripts', 'styles', 'fonts', 'images']


gulp.task('clean', () => del('dist'))

gulp.task('develop', assetsTasks, () => {
    return runHugo(runServer, hugoDefaultArgs)
})
gulp.task('develop-preview', assetsTasks, () => {
    return runHugo(runServer, hugoPreviewArgs)
})
gulp.task('build', assetsTasks, (done) => runHugo(done, hugoDefaultArgs))
gulp.task('build-preview', assetsTasks, (done) => runHugo(done, hugoPreviewArgs))
gulp.task('default', ['develop'])



gulp.task('hugo', (done) => runHugo(done, hugoDefaultArgs))
gulp.task('hugo-preview', (done) => runHugo(done, hugoPreviewArgs))


gulp.task('styles', ['clean'], () =>
    gulp.src(stylesGlob)
        .pipe(sourcemaps.init())
        .pipe(postcss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./site/static/styles'))
        .pipe(browserSync.stream())
)


gulp.task('scripts', ['clean'], (done) => {
    del('./site/static/assets')
    webpack(webpackConfig, (error, stats) => {
        if (error) {
            throw new Error(error)
        }
        logger.info("[webpack]", stats.toString({
            colors: true,
            progress: true
        }))
        browserSync.reload()
        done()
    })
})


gulp.task('fonts', ['clean'], () => (
    gulp.src(fontsGlob)
        .pipe(flatten())
        .pipe(gulp.dest('./site/static/fonts'))
        .pipe(browserSync.stream())
))


gulp.task('images', ['clean'], () =>
    gulp.src(imagesGlob)
        .pipe(imagemin())
        .pipe(gulp.dest('./site/static/images'))
        .pipe(browserSync.stream()))


const runServer = () => {
    browserSync.init({
        server: {
            baseDir: buildDir,
        }
    })
    gulp.watch(stylesGlob, ['styles'])
    gulp.watch(scriptsGlob, ['scripts'])
    gulp.watch(fontsGlob, ['fonts'])
    gulp.watch(imagesGlob, ['images'])
    gulp.watch(hugoGlob, ['hugo'])
    gulp.watch(assetsManifest, ['hugo'])
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