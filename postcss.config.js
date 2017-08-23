var px2rem = require('postcss-px2rem');
var autoprefixer = require("autoprefixer");

module.exports = {
    plugins: [
        /*px2rem({
            remUnit: 750 / (320 / 100)
        }),*/
        autoprefixer({
            browsers: ['Android >= 4.0']
        })
    ]
}