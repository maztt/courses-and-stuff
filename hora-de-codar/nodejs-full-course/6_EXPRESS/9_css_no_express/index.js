const express = require('express')
const app = express()
const path = require('path')

const port = 3000

const absolutePath = path.join(__dirname, 'templates')

const userRoutes = require('./users')

// ler o body
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(express.json())

app.use(express.static('public'))

app.use('/users', userRoutes) // ROTA PARA USERS

app.get('/', (req, res) => {
  res.sendFile(`${absolutePath}/index.html`)
})

app.use((req, res, next) => {

  res.status(404).sendFile(`${absolutePath}/404.html`)

})

app.listen(port, () => {
  console.log('Rodando...')
})
