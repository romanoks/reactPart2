var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'eval',
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('bundle.css')
    ],

    resolve: {
        modulesDirectories: [
            'src',
            'node_modules'
        ],
        extensions: ['', '.json', '.js', '.jsx']
    },

    devServer: {
        historyApiFallback: true,
        port: 3000,
        hot: true,
        contentBase: './public',
        publicPath: '/',
        proxy: [
            {
                context: ['/api/**'],
                target: 'https://test.networkedevent.ericsson.net',
                secure: false
            }
        ]
    },

    module: {
        // preLoaders: [
        //     {
        //         test: /\.js$/,
        //         loaders: ['eslint'],
        //         include: [
        //             path.resolve(__dirname, 'src'),
        //         ],
        //     }
        // ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-0', 'react'],
                    plugins: ['react-hot-loader/babel']
                },
                include: [path.resolve(__dirname, 'src')]
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css'),
            },
            {
                test: /\.scss/,
                loader: ExtractTextPlugin.extract('style', 'css!sass'),
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                loader: 'file',
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json',
            },
        ]
    }
};