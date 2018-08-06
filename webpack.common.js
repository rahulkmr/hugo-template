const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
var ManifestPlugin = require('webpack-manifest-plugin')
const webpack = require('webpack')

const constants = require('./constants')


module.exports = {
    entry: {
        bundle: ['./src/scripts/app.js'],
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, constants.buildPath),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                        }
                    },
                    'eslint-loader',
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new ManifestPlugin(),
    ],
}
