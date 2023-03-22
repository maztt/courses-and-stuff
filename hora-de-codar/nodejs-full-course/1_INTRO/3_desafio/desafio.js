const fs = require('fs')

fs.readFile('../2_utilizando_modulo/arquivo.txt', 'utf8', (err, data) => {
  if (err) return console.log(err)

  if (data) {
    console.log(data)
  }}
)

const a = 2
const b = 3

console.log(a + b)