const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const srcPath = path.join(__dirname, 'src')
const outputPath = path.join(__dirname, 'dist')

module.exports = {
    devtool: "source-map",
    context: srcPath,
    entry: ['babel-polyfill', './app.js'],
    devServer: {
        // 配置直接输入网址无法访问
        historyApiFallback: true
    },
    output: {
        path: outputPath,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000 
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'commons.js'
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            title: "Template",
            template: "index.ejs",
            inject: "body",
            hash: true,
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: true,
        //     warnings: true
        // }),
        new webpack.NamedModulesPlugin()
    ]
}

