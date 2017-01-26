var path = require("path");

module.exports = {
    entry: "index",
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
    resolve: {
        extensions: ['', '.js'],
        root: path.resolve(__dirname, "temp", "app"),
    },
};