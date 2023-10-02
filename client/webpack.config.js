const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require("dotenv-webpack")

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const useRools = preset => {
    const rool = {
        loader: 'babel-loader',
        options: {
            presets: [
                '@babel/preset-env'
            ]
        }
    }

    if (preset) rool.options.presets.push(preset)

    return rool
}

module.exports = {
    mode: isDev,
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: ['@babel/polyfill', './index.tsx']
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: 3000,
        hot: true
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            collapseWhiteSpace: isProd
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css'
        }),
        new Dotenv(),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".svg", ".png"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: useRools('@babel/preset-react')
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: useRools()
            },
            {
                test: /\.(css|less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    'less-loader'
                ],
            },
            {
                test: /\.png|jpg|svg|eot|woff|woff2|ttf$/,
                use: 'file-loader'
            }
        ]
    },
}