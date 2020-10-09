const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename:'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            // 处理less资源
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            // 处理css资源
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            // 处理图片资源
            {
                // 此loader处理不了样式中的图片资源,需html-loader才能处理
                test: /\.(jpg|png|gif|jpeg)$/,
                loader: 'url-loader',
                options: {
                    limit: 8* 1024,
                    name: '[hash:10].[ext]',
                    esModule: false,
                    outputPath: 'imgs',
                }
            },
            // 处理html中的图片资源
            {
                test: /\.html$/,
                loader: 'html-loader'
                //html-loader对图片资源 用commonjs的方式引入， 
                // 而url-loader会通过esModule去解析，两个模块化不一样，就会导致解析失败。
                //所以需要关闭url-loader的esModule，都以commonjs的方式解析
            },
            //处理其他资源
            {
                exclude: /\.(html|js|css|less|jpg|png|gif|jpeg)/,
                loader: 'file-loader',
                outputPath: 'media',
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        // gzip压缩
        compress: true,
        port: 3000,
        // 自动打开服务器
        open: true,
    },
    mode: 'development'
    
}