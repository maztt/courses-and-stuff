const http = require('http')

const port = 3000
const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Contenty-Type', 'text/html')
  res.end('<h1>My first NodeJS html server.</h1>')
})

server.listen(port, () => {
  console.log('Rodando na porta:', port)
})