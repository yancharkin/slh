const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",

    entry: {
        main: "./src/js/index.js"
    },

    output: {
        path: path.resolve(__dirname, "www"),
        filename: "js/[name].js"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                include: [ "./src/js" ],
                loader: "babel-loader",
                options: { presets: ["env"] }
            }
        ]
    },

    plugins: [
        new CopyWebpackPlugin([
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
                from: "./src/index.html",
                to: "."
            },
            {
                from: "./src/css",
                to: "./css"
            },
            {
                from: "./src/assets",
                to: "./assets"
            }
        ]),
    ],

    optimization: {
        splitChunks: {
            chunks: "all",
            name: "dependencies"
        }
    },

    devServer: {
        contentBase: "www",
    }
}

