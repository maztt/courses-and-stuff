const express = require('express')
const app = express()
const path = require('path')

const port = 3000

const absolutePath = path.join(__dirname, 'templates')

// ler o body
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(express.json())

app.get('/users/add', (req, res) => {
  res.sendFile(`${absolutePath}/userform.html`)
})

app.post('/users/save', (req, res) => {
  console.log(req.body)

  const name = req.body.name
  const age = req.body.age

  console.log(`${name} tem ${age}`)

  res.sendFile(`${absolutePath}/userform.html`)
})

app.get('/users/:id', (req, res) => {
  const id = req.params.id
  console.log('user:', id)

  res.sendFile(`${absolutePath}/users.html`)
})


app.get('/', (req, res) => {
  res.sendFile(`${absolutePath}/index.html`)
})

app.listen(port, () => {
  console.log('Rodando...')
})
