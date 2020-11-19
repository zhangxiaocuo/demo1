



const {task, src, dest, watch, series, parallel} = require('gulp');
const minc = require("gulp-minify-css");   //css压缩
const bab = require("gulp-babel");  
const ug = require("gulp-uglify");  //js压缩
const minh = require("gulp-minify-html");



task('css', async () => {
  src('./css/*.css')
  .pipe(minc())
  .pipe(dest('./dist/css'))
});


task('js', async () => {
  src('./js/*.js')
  .pipe(bab({presets: ['@babel/preset-env']}))
  .pipe(ug())
  .pipe(dest('./dist/js'))
});

task('html', async () => {
  src('./index.html')
  .pipe(minh())
  .pipe(dest('./dist'))
});

task('html1', async () => {
  src('./html/*.html')
  .pipe(minh())
  .pipe(dest('./dist/html'))
});

task('img', async () => {
  src(['./img/*.png', './img/*.jpg'])
  .pipe(dest('./dist/img'))
});







