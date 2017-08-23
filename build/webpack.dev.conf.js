var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var baseWebpackConfig = require('./webpack.base.conf');

Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = [
        'eventsource-polyfill',
        'webpack-hot-middleware/client?reload=true'
    ].concat(baseWebpackConfig.entry[name])
});

module.exports = merge(baseWebpackConfig, {
    output: {
        filename: '[name].js'
    },

    plugins: [
        /* HotModule 插件在页面进行变更的时候只会重回对应的页面模块，不会重绘整个 html 文件 */
        new webpack.HotModuleReplacementPlugin(),

        /* 使用了 NoErrorsPlugin 后页面中的报错不会阻塞，但是会在编译结束后报错 */
        //new webpack.NoErrorsPlugin(), 1.x
        new webpack.NoEmitOnErrorsPlugin(),

        /* 将 index.html 作为入口，注入 html 代码后生成 index.html文件 */
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })
    ],

    devtool: 'eval-source-map'
});
