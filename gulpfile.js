var gulp   = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var less   = require('gulp-less');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

var public_dir  = 'public/';
var angular_dir = 'public/app/';


gulp.task('less', function (){
  gulp
  .src(public_dir + 'css/less/main.admin.less')
  .pipe(less())
  .pipe(cssmin())
  .pipe(rename({ suffix:'.min'}))
  .pipe(gulp.dest(public_dir + 'css'));

  gulp
  .src(public_dir + 'css/less/main.public.less')
  .pipe(less())
  .pipe(cssmin())
  .pipe(rename({ suffix:'.min'}))
  .pipe(gulp.dest(public_dir + 'css'));
});


gulp.task('concat_vendors', function() {
  
  gulp.src([
    public_dir + 'bower_components/jquery/dist/jquery.min.js',
    public_dir + 'bower_components/bootstrap/dist/js/bootstrap.min.js',
    public_dir + 'bower_components/tinymce-dist/tinymce.min.js',
    public_dir + 'bower_components/underscore/underscore-min.js'
  ])
  .pipe(concat('vendors.js'))
  .pipe(gulp.dest(public_dir + 'js'));

});

gulp.task('concat_angular_vendors', function() {
  
  gulp.src([
    public_dir + 'bower_components/angular/angular.min.js',
    public_dir + 'bower_components/satellizer/satellizer.min.js',
    public_dir + 'bower_components/ng-flow/dist/ng-flow-standalone.min.js',
    public_dir + 'bower_components/angular-filter/dist/angular-filter.min.js',
    public_dir + 'bower_components/angular-ui-router/release/angular-ui-router.min.js',
    public_dir + 'bower_components/angular-toastr/dist/angular-toastr.tpls.min.js',
    public_dir + 'bower_components/angular-animate/angular-animate.min.js',
    public_dir + 'bower_components/angular-ui-tinymce/src/tinymce.js',
    public_dir + 'bower_components/tinymce-dist/themes/modern/theme.min.js',
  ])
  .pipe(concat('angular-vendors.js'))
  .pipe(gulp.dest(public_dir + 'js'));

  //TinyMCE vendors
  gulp
    .src(public_dir + 'bower_components/tinymce-dist/skins/**/**')
    .pipe(gulp.dest(public_dir + 'js/skins/'));

});


gulp.task('concat_angular_app', function(){

  gulp.src(angular_dir + 'init.js')
    .pipe(concat('app.core.js'))
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest(public_dir + 'js'));

  gulp.src([angular_dir + '**/*.js', '!' + angular_dir + 'init.js'])
    .pipe(concat('app.module.js'))
    .pipe(uglify({mangle:false}))
    .pipe(gulp.dest(public_dir + 'js'));
});

gulp.task('watch', function() {
  gulp.watch(['public/app/**/**','public/css/**/**'], ['concat_angular_app','less']);
});


gulp.task('default', ['less','concat_vendors','concat_angular_vendors','concat_angular_app','watch']);