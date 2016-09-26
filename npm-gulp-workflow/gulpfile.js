var gulp = require('gulp'),
    webserver = require('gulp-webserver'),  
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;
    src = './process',
    app = './build';
     

gulp.task('js', function() {
  return gulp.src( src + '/js/main.js' )
    .pipe(gulp.dest(app + '/js'));
});

gulp.task('sass', function() {
  return gulp.src('./process/sass/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css'));
});


gulp.task('watch', function() {
  gulp.watch( src + '/js/main.js', ['js']);
  gulp.watch( src + '/sass/style.scss', ['sass']);

});

gulp.task('bsCssWatch', ['sass'], function(done){
  browserSync.reload();
  done();
});

gulp.task('bsJsWatch', ['js'], function(done){
  browserSync.reload();
  done();
});

gulp.task('prodCss', function(){
  return gulp.src([
    './node_modules/reset.css/reset.css',
    './node_modules/bootstrap/dist/css/bootstrap.min.css',
    './node_modules/animate.css/animate.css',
    ])
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(concat('/'))
  .pipe(gulp.dest(app + '/css/minified.css'))
});

gulp.task('prodJs', function(){
  return gulp.src([
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/fullpage.js/jquery.fullPage.js',
    ])
    .pipe(gulp.dest(app + '/js/'))
});

gulp.task('browser-sync', function(){
  browserSync.init({
    server: {
      baseDir: "./build/",
      reloadOnRestart: false,
    }
  });
  gulp.watch(app + "/*.html").on("change", reload);
  gulp.watch(src + "/sass/*.scss", ['bsCssWatch']);
  gulp.watch(src + "/js/main.js", ['bsJsWatch']);
});

gulp.task('webserver', function() {
  gulp.src( app + '/')
    .pipe(webserver({
        livereload: true,
        open: true
    }));
});
