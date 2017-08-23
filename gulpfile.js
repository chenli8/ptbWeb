/**
 * Created by Kirk liu on 2017/6/27.
 */
var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var vsftp = require('gulp-vsftp');
var zip = require('gulp-zip');
var moment = require('moment-kirk');
var webpackFile = require("./config/webpack/webpack.file.conf");
var packageInfo = require("./package.json");

/* 生成构建时间 存放在 生产目录里*/
gulp.task('buildTime', () =>
    fs.writeFile(path.resolve(webpackFile.proDirectory) + "/buildTime.txt", moment(new Date()).format('YYYY-MM-DD HH:mm:ss') +' '+ packageInfo.version , function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!",path.resolve());
    })
);
/* 打包生产目录 */
gulp.task('zip', () =>
    gulp.src(path.resolve(webpackFile.proDirectory + '/**'))
        .pipe(zip('pc-[' + packageInfo.version +']-['+ moment(new Date()).format('YYYY-MM-DD HH-mm-ss')+'].zip'))
        .pipe(gulp.dest('backup'))
);
/* 上传生产目录到test http://test.pintuibao.cn  */
gulp.task('test', function () {
    return gulp.src(webpackFile.proDirectory+'/**')
        .pipe(vsftp({
            host: '192.168.5.12',
            user: 'developer',
            pass: 'ptb-qwesdf',
            cleanFiles: true,
            remotePath: '/docker-developer-test/modules/www/static/pc',
        }));
});
/* 上传生产目录到hera http://hera.pintuibao.cn  */
gulp.task('hera', function () {
    return gulp.src(webpackFile.proDirectory+'/**')
        .pipe(vsftp({
            host: '192.168.5.14',
            user: 'developer',
            pass: 'ptb-qwesdf',
            cleanFiles: true,
            remotePath: '/data1/docker-developer-test/modules/web/pc/',
        }));
});
