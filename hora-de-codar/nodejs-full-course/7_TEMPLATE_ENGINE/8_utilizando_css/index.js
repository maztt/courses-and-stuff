const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

const hbs = exphbs.create({
  partialsDir: ["views/partials"]
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/dashboard', (req, res) => {

  const items = ['a', 'b', 'c']

  res.render('dashboard', {items: items})
})

app.get('/post', (req, res) => {
  const post = {
    title: 'Aprender NODEjs',
    category: 'JavaScript',
    body: 'Este artigo irá te ajudar',
    comments: 4
  }

  res.render('blogpost', { post })
})

app.get('/blog', (req, res) => {
  const posts = [
    {
      title: 'Aprender Node',
      category: 'Javascript',
      body: 'Teste',
      comments: 4
    },
    {
      title: 'Aprender PHP',
      category: 'PHP',
      body: 'Teste',
      comments: 6
    },
    {
      title: 'Aprender Node',
      category: 'Python',
      body: 'Teste',
      comments: 7
    }
  ]

  res.render('blog', { posts })
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
