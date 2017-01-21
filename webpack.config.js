var path = require("path");

module.exports = {
    module: {
        resolveLoader:{
            modulesDirectories: ["web_loaders", "web_modules", "node_loaders", "node_modules"],
            extensions: ["", ".webpack-loader.js", ".web-loader.js", ".loader.js", ".js"],
            packageMains: ["webpackLoader", "webLoader", "loader", "main"]
        },
        resolve: {
            extensions: ['', '.js']
        },
        loaders: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};