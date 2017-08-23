var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var baseWebpackConfig = require("./webpack.base.conf");
var webpackFile = require('./webpack.file.conf')
var entry = require("./webpack.entry.conf");

var config = merge(baseWebpackConfig, {
    output: {
        path: path.resolve(webpackFile.proDirectory),
        filename: 'js/[name].[chunkhash:8].js',
        chunkFilename: "js/[id].[chunkhash:8].js",
    },
    plugins: [
        // 设置生产环境
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            }
        }),
        /* common 业务公共代码，vendor引入第三方 */
        new webpack.optimize.CommonsChunkPlugin({
            name: ["common", "vendor"],
        }),
        /* 防止 vendor hash 变化 */
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        // extract css into its own file
        new ExtractTextPlugin('css/[name].[contenthash:8].css'),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: {removeAll: true},
                // 避免 cssnano 重新计算 z-index
                safe: true
            },
            canPrint: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false/*删除版权信息*/
            },
            compress: {
                warnings: false
            }
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(png|jpg|gif|ttf|eot|woff|woff2|svg)$/,
                loader: 'url-loader?limit=8192&name=[name].[hash:8].[ext]&publicPath=' + webpackFile.resourcePrefix + '&outputPath=' + webpackFile.resource + '/'
            },
            {
                test: /\.swf$/,
                loader: 'file?name=js/[name].[ext]'
            }
        ]
    }
});
var pages = entry;
for (var chunkname in pages) {
    var conf = {
        filename: chunkname + '.html',
        template: 'index.html',
        inject: true,
        title: pages[chunkname][1],
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        },
        chunks: ['manifest', 'vendor', 'common', chunkname],
        hash: false,
        chunksSortMode: 'dependency'
    };
    config.plugins.push(new HtmlWebpackPlugin(conf));
}
/* 清除 pc */
config.plugins.push(webpackFile.cleanFun([webpackFile.proDirectory]));
/* 拷贝静态资源  */
webpackFile.copyArr.map(function (data) {
    return config.plugins.push(data)
});
module.exports = config;
