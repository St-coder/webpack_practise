const { resolve } = require('path');
// 处理html中的图片
const HtmlWebpackPLugin = require('html-webpack-plugin');
//  提取css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// 复用loader
const CommonCssLoader = [
  //  提取成单独的文件
  MiniCssExtractPlugin.loader,
  //  把css切入到js中
  'css-loader',
  // 做兼容性处理
  // {
  //     loader: 'postcss-loader',
  //     options: {
  //         ident: 'postcss',
  //         plugins: () =>{
  //             require('postcss-preset-env')()
  //         }
  //     }
  // },
];

process.env.NODE_ENV = 'production';

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          ...CommonCssLoader,
        ],
      },
      {
        test: /\.less$/,
        use: [
          ...CommonCssLoader,
          // 把less---> css
          'less-loader',
        ],
      },
      {
        // 检查js
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        // 指定loader执行顺序
        enforce: 'pre',
        options: {
          fix: true,
        },
      },
      {
        // 兼容js
        // test: /\.js$/,
        // exclude: /node_modules/,
        // loader: 'babel-loader',
        // options: {
        //     presets: [
        //         [
        //             '@babel/preset-env',
        //             {
        //                 // 按需加载
        //                 useBuiltIns: 'usage',
        //                 corejs: {version: 3},
        //                 targets: {
        //                     chrome: '60',
        //                     firefox: '50'
        //                 }
        //             }
        //         ]
        //     ]
        // }
      },
      {
        // 处理图片
        test: /\.(jpg|png|jpeg)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          outputPath: 'imgs',
          esModule: false,
        },
      },
      {
        // 处理html中的图片
        test: /\.html$/,
        loader: 'html-loader',
        // options: {
        //     limit: 8*1024,
        //     name: '[hash:10].[ext]',
        //     outputPath: 'imgs',
        // }
      },
      {
        // 处理其他文件
        exclude: /\.(js|html|jpg|png|jpeg|less|css)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/built.css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new HtmlWebpackPLugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
};
