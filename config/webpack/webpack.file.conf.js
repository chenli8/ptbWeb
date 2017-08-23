var path = require("path");
var webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

function cleanFun(arr) {
    return (new CleanWebpackPlugin(arr, {root: path.resolve(__dirname,'../../'), verbose: true, dry: false}))
};
var copyArr = [
    new CopyWebpackPlugin([{from: './app/public/plugin', to: './plugin', ignore: ['.*']}]),
    new CopyWebpackPlugin([{from: './app/entry/versionTips', to: './versionTips', ignore: ['.*']}]),
    new CopyWebpackPlugin([{from: './app/public/img/favicon.ico', to: './', ignore: ['.*']}])
];
module.exports = {
    devDirectory:'build',/*开发目录*/
    proDirectory:'pc',/*发布目录*/
    resource:'resource',/*静态资源*/
    resourcePrefix:'/static/pc/',/*线上静态资源前缀*/
    cleanFun: cleanFun,
    copyArr: copyArr
};
