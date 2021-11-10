const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')

let currentEnv = 'development';// production   development
let template = 'public/index.html';
let publicPath = 'https://www.developerpeach.top/justblog/dist/';

console.log(currentEnv, template)
// 5.0.0
module.exports = {
    mode: currentEnv,
    entry: path.resolve(__dirname, 'src/main.js'),
    output: {
        publicPath: publicPath,
        path: path.resolve(__dirname, 'dist'),
        filename: '[fullhash].js'// ['hash', 'chunkhash', 'name', 'id', 'query']
    },
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                use: ['vue-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.js(x)$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '*'],
        alias: {
            "@": path.resolve(__dirname, './src'),
            'vue$': 'vue/dist/vue.esm-bundler.js'
        }
    },
    devServer: {
        compress: true,
        port: 8084
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, template)
        }),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(currentEnv)
        })
    ]
}