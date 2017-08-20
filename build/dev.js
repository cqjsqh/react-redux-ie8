var path = require('path');
var express = require('express');
var webpack = require('webpack');
var opn = require('opn');
var ip = require('ip');
var proxyMiddleware = require('http-proxy-middleware');
var config = require('./webpack.dev.conf');

/* 使用 express 启动一个服务 */
var app = express();
var compiler = webpack(config);

/* 启动 webpack-dev-middleware，将 编译后的文件暂存到内存中 */
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
});
app.use(devMiddleware);

/* 启动 webpack-hot-middleware，也就是我们常说的 Hot-reload */
var hotMiddleware = require('webpack-hot-middleware')(compiler);
app.use(hotMiddleware);

/* 载入并更新index.html html-webpack-plugin */
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({ action: 'reload' });
        cb()
    })
});

// 服务器代理（可跨域）
/*var proxyTable = {
    '/api': {
        target: 'http://www.example.org', // target host
        changeOrigin: true,
        ws: true,
        pathRewrite: {
            '^/api' : '/'
        }
    }
};
Object.keys(proxyTable).forEach(function (context) {
    app.use(proxyMiddleware(context, proxyTable[context]))
});*/

/* 静态资源 */
app.use('/static', express.static(path.join(__dirname, '../static')));

/* 单页面应用 HTML5 history API */
//app.use(require('connect-history-api-fallback')());


var server = app.listen(process.env.PORT || 3000, function(err) {
    if (err) {
        console.log(err);
        return;
    }

    var uri = 'http://' + ip.address() + ':' + server.address().port;
    console.log('Listening at ' + uri + '\n');
    opn(uri);
});
