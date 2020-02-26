// test demo config
const path = require('path');
const config = require('./config');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isPlay = process.env.PLAY_ENV;

const webpackConfig = {
    mode: process.env.NODE_ENV,
    entry: isProd ? {
        docs: './examples/entry.js'
    } : (isPlay ? './examples/play.js' : './examples/entry.js'),
    output: {
        path: path.resolve(process.cwd(), './examples/z-element/'),
        publicPath: process.env.CI_ENV || '',
        filename: '[name].[hash:7].js',
        chunkFilename: isProd ? '[name].[hash:7].js' : '[name].js',
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: config.alias,
        modules: ['node_modules'],
    },
    // config webpack-server 
    devServer: {
        host: '0.0.0.0',
        port: 8085,
        publicPath: '/',
        hot: true
    },
    performance: {
        hints: false // webpack throw warning hints.
    },
    stats: {
        children: false,
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: './index.html',
        }),
        new VueLoaderPlugin(),
        new ProgressBarPlugin(),
        new webpack.DefinePlugin({
            'process.env.FAAS_ENV': JSON.stringify(process.env.FAAS_ENV),
        }),
        new webpack.LoaderOptionsPlugin({
            vue: {
                compilerOptions: {
                  preserveWhitespace: false
                }
              }
        }),
    ],
    // optimization: {
    //     minimizer: []
    // }
    devtool: '#eval-source-map'
};

module.exports = webpackConfig;