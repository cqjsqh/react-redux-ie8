var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var baseWebpackConfig = require('./webpack.base.conf');


module.exports = merge(baseWebpackConfig, {
    output: {
        filename: 'static/js/[name].[chunkhash].js',
        // 没有指定输出名的文件输出的文件名
        chunkFilename: 'static/js/[id].[chunkhash].js'
    },

    plugins: [
        //new ExtractTextPlugin('static/css/[name].[contenthash].css'),

        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            minify: { // 压缩的方式
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),

        /* 把引用node_modules的js文件打包成公共包 */
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        })
    ],

    devtool: 'source-map'
});

