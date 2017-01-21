var path = require("path");

module.exports = {
    entry: "index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "docs")
    },
    module: {
        loaders: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    // resolveLoader:{
    //     root: path.resolve(__dirname, "docs"),
    //     modulesDirectories: ["web_loaders", "web_modules", "node_loaders", "node_modules"],
    //     extensions: ["", ".webpack-loader.js", ".web-loader.js", ".loader.js", ".js"],
    //     packageMains: ["webpackLoader", "webLoader", "loader", "main"]
    // },
    resolve: {
        extensions: ['', '.js'],
        root: path.resolve(__dirname, "temp", "app"),
    },
};