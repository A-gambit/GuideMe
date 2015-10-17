var gulp = require('gulp')
var webpack = require('webpack')
var sh = require('shelljs')


var watch = require('gulp-watch')

var rename = require("gulp-rename")

var minifyCSS = require('gulp-minify-css')
var concat = require('gulp-concat')
var autoprefixer = require('gulp-autoprefixer')
var stylus = require('gulp-stylus')

var nodemon = './node_modules/.bin/nodemon --watch '
var babelNode = './node_modules/.bin/babel-node '
var inspector = './node_modules/.bin/node-inspector --web-port=8081'
var server = './src/server'


var searchImgClient = './src/client/**/*.{png,jpg,woff,eof,svg,gif}'
var searchImgServer = './src/server/**/*.{png,jpg,woff,eof,svg,gif}'


var autoprefixerBrowsers = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 6',
  'opera >= 23',
  'ios >= 6',
  'android >= 4.4',
  'bb >= 10'
]

gulp.task('build:client', function (done) {
  var config = require('./webpack.client.js')
  webpack(config, function () { done() })
})



gulp.task('img:client', function () {
  gulp.src(searchImgClient)
    .pipe(rename(function (path) { path.dirname = '' }))
    .pipe(gulp.dest('./dist/assets/img/'))
})

gulp.task('img:server', function () {
  gulp.src(searchImgServer)
    .pipe(rename(function (path) {
      path.dirname = ''
    }))
    .pipe(gulp.dest('./dist/assets/img_server'))
})

gulp.task('img', ['img:client', 'img:server'])

gulp.task('build:style', function () {
  return gulp.src('./src/**/*.styl')
    .pipe(stylus())
    .pipe(autoprefixer('last 15 versions'))
    .pipe(minifyCSS())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./dist/assets/'))
})

gulp.task('serve:nodemon', function (done) {
  sh.exec(nodemon + server + ' ' + babelNode + server,
    function() { done() })
})

gulp.task('serve:nodemon:debug', function() {
  sh.exec(nodemon + server + ' ' + babelNode + '--debug --stage 0 -- ' + server +' --debug',
    function() { done() })
})

gulp.task('serve:nodemon:inspector', function() {
  sh.exec(nodemon + server + ' ' + inspector,
    function() { done() })
})

gulp.task('debug', ['serve:nodemon:debug', 'serve:nodemon:inspector', 'build:style', 'watch'])


if (process.env.NODE_ENV !== 'production') {
  gulp.task('watch', function() {
    watch('./src/**/*.styl', function () {
      gulp.start('build:style')
    })
    watch(searchImgClient, function () {
      gulp.start('img:client')
    })
    watch(searchImgServer, function () {
      gulp.start('img:server')
    })
    gulp.watch('./src/client/**/*.js', ['build:client'])
  })
  gulp.task('build', ['build:client', 'serve:nodemon', 'build:style', 'img'])
  gulp.task('default', ['build', 'watch'])
}
else {
  gulp.task('watch', function() {
    watch('./src/**/*.styl', function () {
      gulp.start('build:style')
    })
    watch(searchImgClient, function () {
      gulp.start('img:client')
    })
    watch(searchImgServer, function () {
      gulp.start('img:server')
    })
    gulp.watch('./src/client/**/*.js', ['build:client'])
  })
  gulp.task('build', ['build:client', 'build:style', 'img'])
  gulp.task('default', ['build', 'watch'])
}

gulp.task('build:prod', ['build:client', 'build:style', 'img'])
