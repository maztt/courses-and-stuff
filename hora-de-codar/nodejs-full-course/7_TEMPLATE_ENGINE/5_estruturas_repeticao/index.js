const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/dashboard', (req, res) => {

  const items = ['a', 'b', 'c']

  res.render('dashboard', {items: items})
})

app.get('/', (req, res) => {
  const user = { // poderia vir do banco de dados
    name: 'Matheus',
    surname: 'Battisti'
  }

  const auth = false

  res.render('home', { user: user, auth })
})

app.listen(3000)
