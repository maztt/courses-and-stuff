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

app.get('/books/edit/:id', (req, res) => { // 1A ETAPA DO EDIT 

  const id = req.params.id

  const query = `SELECT * FROM books WHERE id = ${id}`

  conn.query(query, function(err, data) {
    if (err) {
      console.log(err)
    }

    const book = data[0]
    res.render('editbook', { book })
  })

})

app.get('/books/:id', (req, res) => { // RESGATANDO UM
  const id = req.params.id

  const query = `SELECT * FROM books WHERE id = ${id}`

  conn.query(query, function(err, data) {
    if (err) {
      console.log(err)
    }

    const book = data[0]
    res.render('book', { book })
  })
})

app.get('/books', (req, res) => { // RESGATANDO TUDO
  const query = "SELECT * FROM books"

  conn.query(query, function(err, data) {
    if (err) {
      console.log(err)
    }

    const books = data
    console.log(books)

    res.render('books', { books })
  })
})

app.get('/', (req, res) => {
  res.render('home')
})

app.post('/books/updatebook', (req, res) => {

  const id = req.body.id
  const title = req.body.title
  const pages = req.body.n_pages
  
  const query = `UPDATE books SET title = '${title}', n_pages = '${pages}' WHERE id = ${id}`

  conn.query(query, function(err) {
    if (err) {
      console.log(err)
    }

    res.redirect('/books')
  })

})

app.post('/books/remove/:id', (req, res) => {
  const id = req.params.id
  
  const query = `DELETE FROM books WHERE id = ${id}`

  conn.query(query, function(err) {
    if (err) {
      console.log(err)
      return
    }

    res.redirect('/books')
  })
})

app.post('/books/insertbook', (req, res) => {
  const title = req.body.title
  const pages = req.body.n_pages

  const query = `INSERT INTO books (title, n_pages) VALUES ('${title}', '${pages}')`

  conn.query(query, function(err) {
    if (err) { console.log(err) }

    res.redirect('/books')
  })
})

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql2'
})


conn.connect(function (err) {
  if (err) {
    console.log(err)
  }
  console.log('Conectou ao MySQL!')
  app.listen(3000)
})
