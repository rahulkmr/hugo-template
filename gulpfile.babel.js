import gulp from 'gulp'
import postcss from 'gulp-postcss'
import constants from 'constants'
import BrowserSync from 'browser-sync'

const browserSync = BrowserSync.create()

gulp.task('styles', () =>
    gulp.src('./src/styles/*.css')
        .pipe(postcss())
        .pipe(gulp.dest(`./${constants.buildPath}/styles`))
        .pipe(browserSync.stream())
)