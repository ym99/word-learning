var path = require("path");
var webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        './app/index',
    ],
    output: {
        path: path.resolve(__dirname, "temp"),
        filename: "bundle.js",
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            '__DEVTOOLS__': true,
            'process.env': JSON.stringify('development')
        }),
        new webpack.IgnorePlugin(/regenerator|nodent|js-beautify/, /ajv/)
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'eslint-loader',
                        options: {
                            configFile: './compiler/.eslintrc.json'
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['node_modules', 'app'],
    }
};
