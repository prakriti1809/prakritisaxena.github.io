var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

// Webpack Config
var webpackConfig = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'main': './src/main.ts',
    },

    output: {
        path: './dist',
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name: ['main', 'vendor', 'polyfills'], minChunks: Infinity}),
        // new CopyWebpackPlugin([
        //   { from: './src/index.html', to: 'index.html' }
        // ]),
        new CopyWebpackPlugin([
                {from: './src/'}
            ], {
                ignore: [
                    'main.ts',
                    'polyfills.ts',
                    'vendor.ts'
                ]
            }
        )
    ],

    module: {
        preLoaders: [
            {test: /\.ts$/, loader: 'tslint'}
        ],
        loaders: [
            // .ts files for TypeScript
            {test: /\.ts$/, loaders: ['ts-loader', 'angular2-template-loader', 'angular2-router-loader']},
            {test: /\.css$/, loaders: ['to-string-loader', 'css-loader']},
            {test: /\.html$/, loader: 'raw-loader'}
        ]
    }
};

// Our Webpack Defaults
var defaultConfig = {
    devtool: 'cheap-module-source-map',
    cache: true,
    debug: true,
    output: {
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        root: [path.join(__dirname, 'src')],
        extensions: ['', '.ts', '.js']
    },

    devServer: {
        host: '0.0.0.0',
        port: 3000,
        historyApiFallback: true,
        watchOptions: {aggregateTimeout: 300, poll: 1000}
    },

    node: {
        global: 1,
        crypto: 'empty',
        module: 0,
        Buffer: 0,
        clearImmediate: 0,
        setImmediate: 0
    }
};

var webpackMerge = require('webpack-merge');
module.exports = webpackMerge(defaultConfig, webpackConfig);
