const path = require('path')

// path absoluto
console.log(path.resolve('contato.html'))

// formar path

const midFolder = 'relatorios'
const fileName = 'mateus.txt'

const finalPath = path.join("/", 'arquivos', midFolder, fileName)

console.log('aqui:', finalPath)