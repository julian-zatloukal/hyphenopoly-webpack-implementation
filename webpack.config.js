const path = require('path')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: {
        vendor: './src/vendor.js',
        main: './src/index.js',
    },
    mode: 'production',
    output: {
        filename: 'js/[name].[contentHash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
        runtimeChunk: 'single',
    },
    performance: {
        hints: false
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin([
            {
                context: './',
                from: 'node_modules/hyphenopoly/Hyphenopoly.js',
                to: './js/hyphenopoly/',
                force: true,
                flatten: true,
            },
            {
                context: './',
                from: 'node_modules/hyphenopoly/patterns/{es,it,de,en-us}.wasm',
                to: './js/hyphenopoly/patterns/',
                globOptions:{
                    extglob: true
                },
                force: true,
                flatten: true,
            },
        ]),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            favicon: ''
        }),
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
        ],
    },
}