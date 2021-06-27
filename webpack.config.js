const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");


module.exports = {
    mode: "production",
    entry: {
        'iconset': '/src/iconset.js',
        'iconset.min': '/src/iconset.js',
    },
    output: {
        library: "ICON_SET",
        libraryTarget: "umd",
        globalObject: 'this',
        filename: "[name].js",
        libraryExport: "default",
        path: path.resolve(__dirname, "dist"),
    },


    optimization: {
        minimizer: [
            new TerserPlugin({
                test: /\.min\.js$/
            }),
        ],

    },
}