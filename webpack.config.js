const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development', // development/production
    devtool: 'eval-source-map',
    entry: {
        main: path.join(__dirname, 'src/js/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'www'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "./node_modules/MIDI.js/build/MIDI.min.js",
                    to: "./js/"
                },
                {
                    from: "./node_modules/MIDI.js/inc/shim/Base64.js",
                    to: "./js/"
                },
                {
                    from: "./node_modules/MIDI.js/inc/shim/Base64binary.js",
                    to: "./js/"
                },
                {
                    from: "./src/js/setup.js",
                    to: "./js/"
                },
                {
                    from: "./src/electron/preload.js",
                    to: "./js/"
                },
                {
                    from: "./src/index.html",
                    to: "."
                },
                {
                    from: "./src/pwa/serviceWorker.js",
                    to: "."
                },
                {
                    from: "./src/pwa/manifest.json",
                    to: "."
                },
                {
                    from: "./src/electron/index.js",
                    to: "."
                },
                {
                    from: "./src/electron/package.json",
                    to: "."
                },
                {
                    from: "./src/css",
                    to: "./css"
                },
                {
                    from: "./src/assets",
                    to: "./assets"
                },
                {
                    from: "./screenshots",
                    to: "./screenshots"
                }
            ]
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: 'dependencies'
        }
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'www'),
            watch: true,
        },
        devMiddleware: {
            writeToDisk: (filePath) => {return !/hot-update/i.test(filePath)},
        },
        client: {
            overlay: true,
            progress: true,
        },
        compress: true,
        port: 9000,
    }
}
