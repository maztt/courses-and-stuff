const fs = require('fs'); // file system

fs.readFile('arquivo.txt', 'utf8', (err, data) => { // arquivo, leitura(encode), callback
  if (err) return console.err(err)
  console.log(data)
})

