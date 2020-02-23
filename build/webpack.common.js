const path = require('path');
const progressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const config = require('./config');

module.exports = {
    mode: 'production', // 设定开发模式
    entry: { // 设定入口文件
        app: './src/index.js'
    },
    output: { // 设定输出文件及其配置
        path: path.resolve(process.cwd(), './dist'),//The output directory as an absolute path.
        publicPath: '/dist/', // 这个配置的含义不太清楚.
        libraryTarget: 'umd', // 输出格式
        filename: 'zelement.common.js', // 设定输出项的文件
        chunkFilename: '[id].js', // This option determines the name of non-entry chunk files
        libraryExport: 'default', // the default export of the entry point will be assigned to the library target
        umdNamedDefine: true,//是否将模块名称作为amd的输出空间名称
    },
    externals: config.externals,// webpack打包时排除在外的部分
    resolve: { // These options change how modules are resolved
        extensions: ['.js', '.vue', '.json'], // Attempt to resolve these extensions in order.
        alias: config.alias, // Create aliases to import or require certain modules more easily (暂时先不配置)
        modules: ['node_modules'], // Tell webpack what directories should be searched when resolving modules
    },
    module: {
        rules: [
            // css-loader 的规则
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            // vue-loader 的规则
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [ // The plugins option is used to customize the webpack build process in a variety of ways
        new progressBarPlugin(),
        new VueLoaderPlugin(), // add vue-loader to webpack to compile vue 
    ]
}