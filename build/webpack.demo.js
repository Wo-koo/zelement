// test demo config
const path = require('path');
const config = require('./config');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

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
        host: 'localhost',
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
            // { // 一个检测代码规范的插件，后期可以丰富添加
            //     enforce: 'pre',
            //     test: /\.(vue|jsx?)$/,
            //     exclude: /node_modules/,
            //     loader: 'eslint-loader'
            //   },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                  isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                  'css-loader',
                  'sass-loader'
                ]
              },
            {
                test: /\.md$/,
                use: [
                  {
                    loader: 'vue-loader',
                    options: {
                      compilerOptions: {
                        preserveWhitespace: false
                      }
                    }
                  },
                  // {
                  //   loader: path.resolve(__dirname, './md-loader/index.js')
                  // }
                ]
            },
            {
                test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
                loader: 'url-loader',
                // todo: 这种写法有待调整
                query: {
                  limit: 10000,
                  name: path.posix.join('static', '[name].[hash:7].[ext]')
                }
              }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: './index.html',
        }),
        new VueLoaderPlugin(),
        new ProgressBarPlugin(),
        // new webpack.DefinePlugin({
        //     'process.env.FAAS_ENV': JSON.stringify(process.env.FAAS_ENV),
        // }),
        new webpack.LoaderOptionsPlugin({
            vue: {
                compilerOptions: {
                    preserveWhitespace: false
                }
            }
        }),
    ],
    optimization: {
        minimizer: []
    },
    devtool: '#eval-source-map'
};

if (isProd) {
    webpackConfig.externals = {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        'highlight.js': 'hljs'
      };  
      webpackConfig.plugins.push(
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash:7].css'
        })
      );
      webpackConfig.optimization.minimizer.push(
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: false
        }),
        new OptimizeCSSAssetsPlugin({})
      );
}

module.exports = webpackConfig;