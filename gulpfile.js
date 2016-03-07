var gulp      = require('gulp');
var concat    = require('gulp-concat');
var uglify    = require('gulp-uglify');
var less      = require('gulp-less');
var cssmin    = require('gulp-cssmin');
var rename    = require('gulp-rename');
var concatCss = require('gulp-concat-css');

var public_dir  = 'public/';
var bower_dir   = 'public/bower_components/';
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
    bower_dir + 'jquery/dist/jquery.min.js',
    bower_dir + 'bootstrap/dist/js/bootstrap.min.js',
    bower_dir + 'tinymce-dist/tinymce.min.js',
    bower_dir + 'underscore/underscore-min.js',
    bower_dir + 'jquery-bridget/jquery-bridget.js',
    bower_dir + 'ev-emitter/ev-emitter.js',
    bower_dir + 'desandro-matches-selector/matches-selector.js',
    bower_dir + 'fizzy-ui-utils/utils.js',
    bower_dir + 'get-size/get-size.js',
    bower_dir + 'outlayer/item.js',
    bower_dir + 'outlayer/outlayer.js',
    bower_dir + 'masonry/masonry.js',
    bower_dir + 'imagesloaded/imagesloaded.js',
    bower_dir + 'slick-carousel/slick/slick.js',
  ])
  .pipe(concat('vendors.js'))
  .pipe(gulp.dest(public_dir + 'js'));

});

gulp.task('css_vendor_concat_min', function () {
  gulp.src([
    bower_dir + 'bootstrap/dist/css/bootstrap.min.css',
    bower_dir + 'angular-toastr/dist/angular-toastr.min.css',
    bower_dir + 'slick-carousel/slick/slick.css',
    bower_dir + 'slick-carousel/slick/slick-theme.css',
    bower_dir + 'font-awesome/css/font-awesome.min.css',
  ])
  .pipe(concatCss("vendors.css"))
  .pipe(cssmin())
  .pipe(rename({ suffix:'.min'}))
  .pipe(gulp.dest(public_dir + 'css'));

  gulp.src(bower_dir + 'font-awesome/fonts/**')
    .pipe(gulp.dest(public_dir + 'fonts/'));
});


gulp.task('concat_angular_vendors', function() {
  gulp.src([
    bower_dir + 'angular/angular.min.js',
    bower_dir + 'satellizer/satellizer.min.js',
    bower_dir + 'angular-sanitize/angular-sanitize.min.js',
    bower_dir + 'ng-flow/dist/ng-flow-standalone.min.js',
    bower_dir + 'angular-filter/dist/angular-filter.min.js',
    bower_dir + 'angular-ui-router/release/angular-ui-router.min.js',
    bower_dir + 'angular-toastr/dist/angular-toastr.tpls.min.js',
    bower_dir + 'angular-animate/angular-animate.min.js',
    bower_dir + 'angular-ui-tinymce/src/tinymce.js',
    bower_dir + 'tinymce-dist/themes/modern/theme.min.js',
    bower_dir + 'angular-masonry/angular-masonry.js',
    bower_dir + 'angular-slick-carousel/dist/angular-slick.min.js',
  ])
  .pipe(concat('angular-vendors.js'))
  .pipe(gulp.dest(public_dir + 'js'));

  //TinyMCE vendors
  gulp
    .src(bower_dir + 'tinymce-dist/skins/**/**')
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


gulp.task('default', ['less','concat_vendors','concat_angular_vendors', 'css_vendor_concat_min', 'concat_angular_app']);
gulp.task('watcher', ['less','concat_vendors','concat_angular_vendors', 'css_vendor_concat_min', 'concat_angular_app','watch']);