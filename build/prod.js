var path = require('path');
var webpack = require('webpack');
require('shelljs/global'); // 在node环境的js中使用shell
var ora = require('ora');  // loading 插件
var config = require('./webpack.prod.conf');

// 开始 loading 动画
var spinner = ora('building for production...');
spinner.start();

/* 拷贝静态文件 */
var assetsPath = path.resolve(__dirname, '../dist/static');
rm('-rf', assetsPath);
mkdir('-p', assetsPath);
cp('-R', 'static/*', assetsPath);


webpack(config, function (err, stats) {
    spinner.stop();
    if (err) throw err

    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
});
