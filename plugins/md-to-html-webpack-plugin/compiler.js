const reg_mark = /^(.+?)\s/
const reg_sharp = /^\#/
const reg_crossbar = /^\-/
function createTree(mdArr) {
  let _htmlPool = {}
  let _lastMark = ''
  mdArr.forEach(mdFragment => {
    const matched = mdFragment.match(reg_mark)
    if (matched) {
      const mark = matched[1]
      const input = matched['input']
      if(reg_sharp.test(mark)) {
        const tag = `h${mark.length}`
        const tagContent = input.replace(reg_mark, '')
        console.log(tag, tagContent)
        if (_lastMark === mark) {
          _htmlPool[tag].tags = [..._htmlPool[tag].tags, `<${tag}>${tagContent}</${tag}>`]
        } else {
          _lastMark = mark
          _htmlPool[tag] = {
            type: 'single',
            tags: [`<${tag}>${tagContent}</${tag}>`]
          }
        }
      }

      if (reg_crossbar.test(mark)) {
        const tagContent = input.replace(reg_mark, '')
        const tag = 'li'
        if (reg_crossbar.test(_lastMark)) {
          _htmlPool['ul'].tags = [..._htmlPool['ul'].tags, `<${tag}>${tagContent}</${tag}>`]
        } else {
          _lastMark = mark
          _htmlPool['ul'] = {
            type: 'wrap',
            tags: [`<${tag}>${tagContent}</${tag}>`]
          }
        }
      }
    }
  });

  return _htmlPool
}

function compileHTML(_mdArr) {
  const _htmlPool = createTree(_mdArr)
  console.log(_htmlPool)
  return _mdArr
}

module.exports = {
    compileHTML
}
