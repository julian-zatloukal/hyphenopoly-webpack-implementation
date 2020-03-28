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
    node: {
        fs: 'empty',
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
                from: 'node_modules/hyphenopoly/Hyphenopoly_Loader.js',
                to: './js/hyphenopoly/',
                force: true,
                flatten: true,
            },
            {
                context: './',
                from: 'node_modules/hyphenopoly/patterns/*',
                to: './js/hyphenopoly/patterns/',
                force: true,
                flatten: true,
            },
        ]),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
            },
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
