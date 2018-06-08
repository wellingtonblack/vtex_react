const path = require('path');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const SpritesmithPlugin = require('webpack-spritesmith');
const webpack = require('webpack');

module.exports = {
    entry: {
        common: './src/modules/common/app.ts',
        website: './src/modules/website/app.tsx',
        checkout: './src/modules/checkout/app.tsx'
    },
    module: {
        rules: [
            {
                test: /\.lazy\.scss$/,
                use: [
                    {
                        loader: "style-loader/useable"
                    },

                    {
                        loader: "css-loader", // translates CSS into CommonJS
                        options: { url: true }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')(['last 2 versions', '>1%', 'Android >= 3.2',  'iOS 7'])]
                        }
                    },
                    {
                        loader: "sass-loader" // compiles Sass to CSS
                    }
                ]
            },

            {
                test: /^(?:(?!lazy).)*\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader", // translates CSS into CommonJS
                        options: { url: true }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')(['last 2 versions', '>1%', 'Android >= 3.2',  'iOS 7'])]
                        }
                    },
                    {
                        loader: "sass-loader" // compiles Sass to CSS
                    }

                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg|gif)$/,
                loader: "file-loader"
            },
            {
                test: /\.tsx?$/,
                enforce: 'pre',
                use: ["ts-loader", "tslint-loader"],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        modules: ["node_modules", "spritesmith-generated"],
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        // Copy the images folder and optimize all the images
        new CopyWebpackPlugin([{
            from: 'src/modules/website/assets/images/',
            to: "./images"
        }]),
        new CopyWebpackPlugin([{
            from: 'src/modules/website/service-worker.js',
            to: "./"
        }]),
        new CopyWebpackPlugin([{
            from: 'src/modules/website/manifest.json',
            to: "./"
        }]),
        new ImageminPlugin({
            minFileSize: 9000,
            test: /\.(jpe?g|png|gif|svg)$/i,
            optipng: {
                optimizationLevel: 9,
                quality: 60
            },
            pngquant: {
                quality: 60,
                speed: 10
            },
            plugins: [
                imageminMozjpeg({
                    quality: 80,
                    progressive: true
                })
            ]
        }),
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, 'src/modules/website/assets/icons'),
                glob: '*.png'
            },
            target: {
                image: path.resolve(__dirname, 'arquivos/sprite.png'),
                css: path.resolve(__dirname, 'src/modules/website/templates/shared/sprites.scss')
            },
            apiOptions: {
                cssImageRef: "/arquivos/sprite.png"
            },
        }),
    ]
};