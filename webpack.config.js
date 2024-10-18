/$$
 $ @Author: YourName
 $ @Date: 2024-10-07 21:13:49
 $ @LastEditTime: 2024-10-18 13:31:06
 $ @LastEditors: YourName
 $ @Description: 
 $ @FilePath: \vue源码\vue2\vue-source\webpack.config.js
 $ @版权声明
 $/

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //实例对象
module.exports = (env) => {
    return {
        mode:'development',
        entry: {
            // cs: paths.appSrc + '\\ceshifuy.js',
            main: './src/main.js',
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            clean: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',//使用的html文件模块
                filename: 'index.html',//输出名称
                inject: 'body',//js文件生成位置
            })
        ],
        devtool: 'source-map',
        module: {
            rules: [
                {
                    oneOf: [
                        {
                            test: [/\.js$/],
                            include: path.resolve(__dirname, './src'),
                            loader: require.resolve('babel-loader')
                        }
                    ]
                }
            ]
        },
        devServer: {
            host: 'localhost',
            port: 5000,
            open: true,
            hot: true,//热更新
            // static: {
            //     directory: paths.appHtml,
            // },
            historyApiFallback: true//history刷新问题
        },
    }

}