const util = require('util')
const fs = require('fs')
const writeFile = util.promisify(require('fs').writeFile)

const fn = (tagName, val) => {
  console.log(`[${tagName}]`, val)
  return val
}
const api = fn.bind(null, 'SNIFF')
api.tag = tagName => fn.bind(null, tagName)
api.file = filename => val =>
  writeFile(filename, JSON.stringify(val, null, 2)).then(() => {
    console.log(`supersniff wrote to ${filename}`)
    return val
  })

module.exports = api