// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true, //ESLint 一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找
    parser: 'babel-eslint', //ESLint 默认使用Espree作为其解析器,这里表示使用babel-eslint解析器
    parserOptions: { //该用于用于设置解析器选项
        sourceType: 'module', //说声script代码是模块的形式进行加载
        ecmaVersion: 6, //指定使用的js版本，默认为5
        "ecmaFeatures": { //表示你想使用的额外的语言特性
            "jsx": true //启用 JSX
        }
    },
    env: {
        browser: true, // browser 全局变量
        node: true, //Node.js 全局变量和 Node.js 作用域。
        commonjs: true, //CommonJS 全局变量和 CommonJS 作用域 (仅为使用 Browserify/WebPack 写的只支持浏览器的代码)。
        es6: true, //支持除模块外所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）
        amd: true, //定义 require() 和 define() 作为像 amd 一样的全局变量
        jquery: true, //jQuery 全局变量。

    },
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    extends: 'standard', //一个配置文件可以被基础配置中的已启用的规则继承
    // required to lint *.vue files
    plugins: [
        "html"
    ],
    // add your custom rules here
    'rules': {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        //设置4个缩进
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "block-spacing": ["error", "always"],
        "semi": ["error", "always"]
    }
}