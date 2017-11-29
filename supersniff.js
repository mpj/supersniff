const util = require('util')
const fs = require('fs')
const writeFile = util.promisify(require('fs').writeFile)
const readFile = util.promisify(require('fs').readFile)


const fn = (tagName, val) => {
  console.log(`[${tagName}]`, val)
  return val
}
const api = fn.bind(null, 'SNIFF')
api.tag = tagName => fn.bind(null, tagName)
api.save = filename => val =>
  writeFile(filename, JSON.stringify(val, null, 2)).then(() => {
    console.log(`supersniff wrote to ${filename}`)
    return val
  })
api.load = filename => readFile(filename).then(data => JSON.parse(data))
api.memo = (filename, fn) =>
  fs.existsSync(filename)
    ? api.load(filename)
    : fn().then(api.save(filename))

module.exports = api