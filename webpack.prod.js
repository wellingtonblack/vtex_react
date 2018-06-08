const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const version = 19;

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: `bundle.v${version}.[name].js`,
        publicPath: '/arquivos/',
        path: path.resolve(__dirname, 'arquivos')
    },
    plugins: [
        new UglifyJSPlugin({
            warningsFilter: (src) => true,
            uglifyOptions: {
                output: {
                    comments: false,
                    beautify: false
                },
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
    ]
});