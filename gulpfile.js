
'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
//var stylish = require('gulp-stylish');

gulp.task('uglify', function(){
  return gulp.src('src/*.js')
    .pipe(uglify().on('error',function(e){
      console.log(e.message + ' : ' + e.lineNumber);
    }))
    .pipe(gulp.dest('build/'))
	.pipe(gulp.dest('example/'));
});

gulp.task('lint', function(){
	return gulp.src('src/*.js')
	.pipe(jshint())

});


gulp.task('default', ['lint','uglify']);


