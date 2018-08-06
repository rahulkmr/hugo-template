const merge = require('webpack-merge')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const common = require('./webpack.common.js')


module.exports = merge.smart(common, {
    mode: 'production',
    output: {
        filename: '[name].[chunkhash].js',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
    ],
    optimization: {
        runtimeChunk: 'single',
        splitChunks:{
            chunks: 'all',
        },
        minimizer: [
            new UglifyJsPlugin({}),
        ],
    }
})
