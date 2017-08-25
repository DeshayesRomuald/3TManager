const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './client/index.js',
    output: {
        filename: 'js/main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
                })
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif|svg)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    publicPath: '../../',
                    name: 'assets/images/[name].[ext]',
                    limit: 10000
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?name=../[path][name].[ext]'},
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?name=../[path][name].[ext]' },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?name=../[path][name].[ext]' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?name=../[path][name].[ext]' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?name=../[path][name].[ext]'}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './client/index.html'
        }),
        new ExtractTextPlugin({
            filename: 'assets/styles/main.css'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new CopyWebpackPlugin([{ from: './client/manifest.json' }]),
        new CopyWebpackPlugin([{
            context: './client/assets/images',
            from: '**/*',
            to: 'assets/images'
        }])
    ],
    devServer: {
        compress: true,
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        hot: true,
        port: 8080
    }
};
