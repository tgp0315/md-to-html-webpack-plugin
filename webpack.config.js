const MdToHtmlWebpackPlugin = require('./plugins/md-to-html-webpack-plugin')
const { resolve } = require('path')
module.exports = {
    mode: 'development',
    entry: resolve(__dirname, 'src/app.js'),
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    plugins: [
        new MdToHtmlWebpackPlugin({
            template: resolve(__dirname, 'test.md'),
            filename: 'test.html'
        })
    ]
}