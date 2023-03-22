const express = require('express')
const app = express()

const exphbs = require('express-handlebars')

const port = 3000


const items = [
  {
    id: 1,
    produto: 'colar',
    preco: 15,
    disponibilidade: true
  },
  {
    id: 2,
    produto: 'copo',
    preco: 10,
    disponibilidade: true
  },
  {
    id: 3,
    produto: 'caneta',
    preco: 5,
    disponibilidade: true
  }
]

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/product/:id', (req, res) => {
  const product = items[parseInt(req.params.id) - 1]

  res.render('product', { product })
})

app.get('/', (req, res) => {
  res.render('home', { items: items })

})


app.listen(port)