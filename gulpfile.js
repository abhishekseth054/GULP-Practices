// JavaScript source code

const gulp = require('gulp');
const imagemin = require('gulp-imagemin'); // npm install gulp-imagemin - to minify the images
const uglify = require('gulp-uglify'); //npm install gulp-uglify -  to minify the js file
const sass = require('gulp-sass'); // npm install gulp-sass -  to minify the css file
const concat = require('gulp-concat'); // npm install gulp-concat - to concat the file
const spsave = require('gulp-spsave'); // npm install gulp-spsave - to upoad a file to SharePoint

/*
--Top LEVEL FUNCTION --

gulp.task - Define tasks
gulp.src - point to files to userAgent
gulp.dest - points to folder to output
gulp.watch - watch files and folder for changes

 */

//To Upload a file to SharePoint
gulp.task('uploadToSP', function () {
    return gulp.src("./dist/js/*.js")
        .pipe(spsave({
            username: "t@mazige.onmicrosoft.com",
            password: "Abcd@1234",
            siteUrl: "https://mazige.sharepoint.com/sites/dev/",
            folder: "Shared Documents/scripts",
            checkin: true,
            checkinType: 1
        }));
});

// to concat the js file
gulp.task('scripts', function () {
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// to minify the css file
gulp.task('sass', function () {
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});

//minifying the JS file
gulp.task('minify', function () {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});


// Optimize Images
gulp.task('imageMin', function () {
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

// to run this task use gulp copyFile
gulp.task('copyFile', function () {
    //gulp.src('src/*') // Copy all files from src folder to dest folder
    gulp.src('src/*.html') // copy only html files from src folder to dest folder
        .pipe(gulp.dest('dist'));
});

gulp.task('message', function () {
    console.log('Message is running');
});

// default task can run by using only gulp to the command prompt
gulp.task('default', ['message', 'copyFile', 'imageMin', 'minify', 'sass', 'scripts','uploadToSP']);

/*gulp.task('default', ['sass'], function () {
    console.log('default Task');
});*/

gulp.task('watch', function () {
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/images/*', ['imageMin']);
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/*.html', ['copyFile']);
});