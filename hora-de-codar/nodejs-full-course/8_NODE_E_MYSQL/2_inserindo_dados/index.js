const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()

app.use(
  express.urlencoded({
    extended: true,
  })
) // middleware

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('home')
})

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql2'
})

app.post('/books/insertbook', (req, res) => {
  const title = req.body.title
  const pages = req.body.n_pages

  const query = `INSERT INTO books (title, n_pages) VALUES ('${title}', '${pages}')`

  conn.query(query, function(err) {
    if (err) { console.log(err) }

    res.redirect('/')
  })
})

conn.connect(function (err) {
  if (err) {
    console.log(err)
  }
  console.log('Conectou ao MySQL!')
  app.listen(3000)
})
