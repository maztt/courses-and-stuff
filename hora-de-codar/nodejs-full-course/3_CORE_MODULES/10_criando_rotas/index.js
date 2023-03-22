const http = require('http')
const url = require('url')
const fs = require('fs')

const port = 3000
const server = http.createServer((req, res) => {

  const q = url.parse(req.url, true)
  const filename = q.pathname.substring(1)

  if (filename.includes('html')) {
    if (fs.existsSync(filename)) {
      fs.readFile(filename, (err, data) => {
        if (err) return console.log(err)

        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(data)
        res.end()
      })
    } else {
      fs.readFile('404.html', (err, data) => {
        if (err) return console.log(err)

        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(data)
        res.end()
      })}
  }

})

server.listen(port, () => {
  console.log('Rodando')
})