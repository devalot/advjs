const gulp  = require('gulp');
const babel = require('gulp-babel');

const GulpFlow = require("gulp-flowcheck");
const flow = new GulpFlow();

gulp.task('default', ['flow'], () => {
  gulp.src('*.js')
    //.pipe(flow.check())
    .pipe(babel({
      plugins: ['transform-flow-strip-types'],
      presets: ['es2015']
     }))
    .pipe(gulp.dest('dist'));
});

gulp.task('flow', () => {
  gulp.src('*.js')
    .pipe(flow.check())
    .pipe(flow.reporter());
});
