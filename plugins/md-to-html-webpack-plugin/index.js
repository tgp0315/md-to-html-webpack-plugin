const { resolve } = require('path')
const { readFileSync } = require('fs')
const { compileHTML } = require('./compiler')
const INNER_MARK = '<!-- inner -->'
class MdToHtmlWebpackPlugin {
    constructor({ template, filename }) {
        if (!template) throw new Error('不能为空')
        this.template = template
        this.filename = filename ? filename : 'md.html'
    }

    apply(compiler) {
        compiler.hooks.emit.tap('md-to-html-webpack-plugin', (compilation) => {
            const _assets = compilation.assets
            const _mdContent = readFileSync(this.template, 'utf-8')
            const _templateHTML = readFileSync(resolve(__dirname, 'template.html'), 'utf-8')
            const _mdContentArr = _mdContent.split('\n')
            const _htmlStr = compileHTML(_mdContentArr)
            console.log(_htmlStr)
            // const _finalHTML = _templateHTML.replace(INNER_MARK, _htmlStr) 
            // _assets[this.filename] = {
            //     source() {
            //         return _finalHTML
            //     },
            //     size() {
            //         return _finalHTML.length
            //     }
            // }
        })
    }
}

module.exports = MdToHtmlWebpackPlugin