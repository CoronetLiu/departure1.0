
const webpack = require("webpack");
const path = require('path');
const proxy = require('http-proxy-middleware');

require("babel-polyfill");//兼容ie9 ++

const HtmlWebpackPlugin = require("html-webpack-plugin"); //html 抽离插件
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin"); //sass-css 抽离插件
const CopyWebpackPlugin = require('copy-webpack-plugin'); //resource转移

module.exports = {
    devtool: 'eval-source-map',  //显示错误所在文件所在行
    performance: {
        hints: false  // 关闭hot更新导致文件过大提示
    },
    entry:{ //入口文件
        main:['babel-polyfill', path.resolve(__dirname, './src/index.js')],
        vendor:["react",
                "react-dom",
                "es6-promise",
                "jsonp",
                "react-router",
                "axios",
                "redux",
                "react-redux",
                "redux-thunk"
            ]
    },
    output:{
        path:__dirname + "/dist", //必须是绝对路径   输出的地址
        filename:"[name]_[chunkHash:3].js" //导出文件名
        // filename:"app_[hash].js"
        // filename:"app_"+Date.now()+".js"
        // ,publicPath:"./"
    },
    devServer:{
        contentBase:"./dist", //服务器开启目录
        host:"localhost",
        port:8000,
        historyApiFallback:true,  //是否使用H5里HISTORYapi
        proxy:{
            '/api':{
                target:'http://',
                changeOrigin: false,
                // secure:false, // https 时启用
                pathRewrite:{
                    '^/api':'/'
                }
            },
            '/serverURL':{
                target:'http://192.168.182.212:59609/obm',
                changeOrigin: false,
                // secure:false, // https 时启用
                pathRewrite:{
                    '^/serverURL':'/'
                }
            },
            "/python":{
                target:'http://stanford.edu/~boyd/cvxbook/cvxbook_additional_exercises',
                changeOrigin: false,
                // secure:false, // https 时启用
                pathRewrite:{
                    '^/python':'/'
                }
            }
        }
    },
    plugins:[  //插件配置
        // new webpack.NoEmitOnErrorsPlugin(), //错误不编译
        new HtmlWebpackPlugin({  //抽离html
            // title: 'CoronetLiu', //标题
            favicon: './src/favicon.ico', //favicon路径
            template: './src/index.html', //html模板路径
            filename: 'index.html', //生成的html存放路径，相对于 path
            inject: true, //允许插件修改哪些内容，包括head与body
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
        new ExtractTextWebpackPlugin({  //抽离文本
            filename:"[name].css",
            allChunks:true
        }),
        new webpack.optimize.CommonsChunkPlugin({ //单独打包
            name:["vendor","manifest"]
        }),
        //启用作用域提升，让代码文件更小、运行更快
        new webpack.optimize.ModuleConcatenationPlugin(),
        new CopyWebpackPlugin([
            { from: path.resolve(__dirname, "./resource"), to: path.resolve(__dirname, './dist/resource') },
        ])
    ],
    module:{
        loaders:[ //编译规则
            {
                test:/\.css$/,
                loader:ExtractTextWebpackPlugin.extract({
                    fallback:"style-loader",
                    use:"css-loader"
                })
            },
            {
                test:/\.scss$/,
                loader:ExtractTextWebpackPlugin.extract({
                    fallback:"style-loader",
                    use:"css-loader!sass-loader"
                })
            },
            {
                test:/\.js$/,
                exclude: /node_modules/,
                loader:'babel-loader',
                query: {
                    presets: ['es2015','react',"stage-0"]
                 }
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/,
                use: [{
                    loader: 'file-loader?name=images/img_[hash:8].[ext]'
                }/*,{
                    loader:'image-webpack-loader?{optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}, mozjpeg: {quality: 65}}'
                }*/]
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: [{
                    loader: 'file-loader?name=fonts/[name].[ext]'
                }]
            }
        ]
    }
}
