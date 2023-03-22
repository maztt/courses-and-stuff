const fs = require('fs')

fs.rename('arquivo.txt', 'novo.txt', (err) => {
  if (err) return console.log(err)

  console.log('Arquivo renomeado!')
})