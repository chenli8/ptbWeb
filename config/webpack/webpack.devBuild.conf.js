var path = require("path");
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackFile = require("./webpack.file.conf");
var baseWebpackConfigDev = require("./webpack.dev.conf");
var entry = require("./webpack.entry.conf");
var pages = entry;

var config = merge(baseWebpackConfigDev, {});
/* 生成开发环境文件 */
for (var chunkname in pages) {
    var conf = {
        filename: chunkname + '.html',
        template: 'index.html',
        inject: true,
        title: pages[chunkname][1],
        minify: {
            removeComments: false,
            collapseWhitespace: false,
            removeAttributeQuotes: false
        },
        chunks: ['manifest', 'vendor', 'common', chunkname],
        hash: false,
        chunksSortMode: 'dependency'
    };
    config.plugins.push(new HtmlWebpackPlugin(conf));
}
/* 清除 build */
config.plugins.push(webpackFile.cleanFun([webpackFile.devDirectory]));
/* 拷贝静态资源  */
webpackFile.copyArr.map(function(data){
    return config.plugins.push(data)
});
module.exports = config;