const path    = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: false,
    mode: 'production',
    entry: {
        bundle: ['react','react-dom','react-router-dom','react-responsive']  //提取公共模块
    },
    output: {
        path: path.join(__dirname, 'src/js'),
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, 'src/js','[name]-manifest.json'),

            name: '[name]_library'
        })
    ]
};