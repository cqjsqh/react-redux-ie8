var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var projectRoot = path.resolve(__dirname, '../');

module.exports = {
    entry: {
        app: './src/main.js'
    },

    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: '/'
    },

    resolve: {
        // 自动补全的扩展名
        extensions: ['.js'],
        // 不进行自动补全或处理的文件或者文件夹
        // fallback: [path.join(__dirname, '../node_modules')], 1.x
        modules: [path.join(__dirname, '../node_modules')],
        // 默认路径代理
        alias: {
            'src': path.resolve(__dirname, '../src')
        }
    },

    module: {
        /*loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                include: projectRoot,
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 1000 * 10,
                    name: 'static/img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 1000 * 10,
                    name: 'static/fonts/[name].[hash:7].[ext]'
                }
            }
        ], 1.x */
        /*postLoaders: [
            {
                test: /\.js$/,
                loaders: ['es3ify-loader']
            }
        ] 1.x */
        rules: [
            /*{
                test: /\.js$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                include: projectRoot,
                exclude: /node_modules/
            },*/
            {
                test: /\.js$/,
                use: ['babel-loader'],
                include: projectRoot,
                exclude: /node_modules/
            },
            {
                test: /\.(css|less)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    query: {
                        limit: 1000 * 10,
                        name: 'static/img/[name].[hash:7].[ext]'
                    }
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    query: {
                        limit: 1000 * 10,
                        name: 'static/fonts/[name].[hash:7].[ext]'
                    }
                }
            },
            {
                test: /\.js$/,
                enforce: 'post',
                use: ['es3ify-loader'],
                include: projectRoot,
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        //new webpack.optimize.OccurenceOrderPlugin(), 1.x
        new webpack.optimize.OccurrenceOrderPlugin(),

        /* definePlugin 接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串 */
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),

        /*new webpack.LoaderOptionsPlugin({
            options: {
                eslint: {
                    // 编译后错误报告格式
                    formatter: require('eslint-friendly-formatter')
                }
            }
        })*/
    ]
};
