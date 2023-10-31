const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        filename: './[name].[contenthash].js',
        path: path.resolve(__dirname, './dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Weather App',
            filename: './index.html',
            template: path.resolve(__dirname, './src/template.html'),
        }),
        new MiniCssExtractPlugin({
            filename: './[name].[contenthash].css',
        }),
    ],
    optimization: {
        runtimeChunk: 'single',
        minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    },
};
