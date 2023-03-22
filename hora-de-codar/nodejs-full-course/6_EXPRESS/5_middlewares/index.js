const express = require('express')
const app = express()
const path = require('path')

const port = 3000

const absolutePath = path.join(__dirname, 'templates')

const checkAuth = (req, res, next) => {

  req.checkAuth = false

  if (checkAuth) {
    console.log('Autorizado')
  } else {
    console.log('Não autorizado')
  }

  next()
}

app.use(checkAuth)

app.get('/', (req, res) => {

  res.sendFile(`${absolutePath}/index.html`)

})

app.listen(port, () => {
  console.log('Rodando...')
})