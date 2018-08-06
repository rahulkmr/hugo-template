const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
var ManifestPlugin = require('webpack-manifest-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const constants = require('./constants')
const env = process.env.NODE_ENV


let config = {
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
        new HtmlWebpackPlugin({
            template: './src/webpack_bundle.html',
            filename: 'webpack_bundle.html',
        }),
        new webpack.HashedModuleIdsPlugin(),
        new ManifestPlugin(),
    ],
}


if (env === 'production') {
    config = merge.smart(config, {
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
            splitChunks: {
                chunks: 'all',
            },
            minimizer: [
                new UglifyJsPlugin({}),
            ],
        }
    })

} else {
    config = merge.smart(config, {
        mode: 'development',
        devtool: 'inline-source-map',
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('development')
            }),
        ],
    })

}

module.exports = config