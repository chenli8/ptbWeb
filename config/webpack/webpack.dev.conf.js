var webpack = require('webpack');
var merge = require('webpack-merge');
var path = require("path");
var baseWebpackConfig = require("./webpack.base.conf");
var webpackFile = require("./webpack.file.conf");
var entry = require("./webpack.entry.conf");

var config = merge(baseWebpackConfig, {
    output: {
        path: path.resolve(webpackFile.devDirectory),
        filename: 'js/[name].js',
        chunkFilename: "js/[id].js",
        publicPath: ''
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
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
                loader: 'style-loader!css-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|ttf|eot|woff|woff2|svg)$/,
                loader: 'url-loader?limit=8192&name=[name].[hash:8].[ext]&publicPath=../&outputPath='+ webpackFile.resource+'/'
            },
            {
                test: /\.swf$/,
                loader: 'file?name=js/[name].[ext]'
            }
        ]
    },
    devServer: {
        host: '0.0.0.0',
        port:8000,
        hot:true,
        inline:true,
        contentBase:path.resolve(webpackFile.devDirectory),
        historyApiFallback: true,
        disableHostCheck: true,
        proxy: [
            {
                context: ['/api/**', '/u/**', '/v1/**', '/media/**', '/share/**', '/common/**'],
                target: 'http://test.pintuibao.cn',
                secure: false
            }
        ]
    }
});
module.exports = config;