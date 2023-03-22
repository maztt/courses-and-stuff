const http = require('http')

const port = 3000
const server = http.createServer((req, res) => {

  const urlInfo = require('url').parse(req.url, true)
  const name = urlInfo.query.name
  
  res.statusCode = 200 // resultado ao acessar
  res.setHeader('Content-Type', 'text/html') // o que retorna

  if (!name) {
    res.end('<h1>Preencha o seu nome:</h1><br><form><input method="GET" type="text" name="name"/><br><input type="submit" value="Enviar"/></form>')
  } else {
    res.end(`<h1>Seu nome é: ${name}</h1>`)
  }

})

server.listen(port, () => {
  console.log('Rodando')
})