module.exports = {
    // eslint找到这个标识后，不会再去父文件夹中找eslint的配置文件
    root: true,
    // 使用babel-eslint来作为eslint的解析器
    parser: 'babel-eslint',
    // 设置解析器选项
    parserOptions: {
        sourceType: 'module' // 表明自己的代码是ECMAScript模块
    },

    // 继承eslint-config-standard里面提供的lint规则
    //extends: 'standard',
    // airbnb
    extends: 'airbnb',
    // 使用的插件eslint-plugin-html
    plugins: [
        'html',

        // airbnb
        'import',
        'react',
        'jsx-a11y'
    ],
    // 启用额外的规则或者覆盖基础配置中的规则的默认选项 http://eslint.cn/docs/rules/
    rules: {
        'arrow-parens': 0,
        'generator-star-spacing': 0,
        'comma-dangle': ['error', 'only-multiline'],
        'semi': 0,

        // airbnb
        'jsx-a11y/href-no-hash': 0,
        'react/prefer-stateless-function': 0,
        'no-unused-vars': 0,
        'indent': [1, 4],
        'react/prop-types': 0
    },

    // 增加的全局变量供运行时使用
    globals: {
        //'CONFIG': true
    },
    // 宿主环境
    env: {
        browser: true,
        node: true
    }
}