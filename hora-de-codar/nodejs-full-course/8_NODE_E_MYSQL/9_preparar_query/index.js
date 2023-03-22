const express = require('express')
const exphbs = require('express-handlebars')
const pool = require('./db/conn')

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

  pool.query(query, function(err, data) {
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

  pool.query(query, function(err, data) {
    if (err) {
      console.log(err)
    }

    const book = data[0]
    res.render('book', { book })
  })
})

app.get('/books', (req, res) => { // RESGATANDO TUDO
  const query = "SELECT * FROM books"

  pool.query(query, function(err, data) {
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

  const data = ['title', title, 'n_pages', pages, 'id', id]
  
  const query = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`

  pool.query(query, data, function(err) {
    if (err) {
      console.log(err)
    }

    res.redirect('/books')
  })

})

app.post('/books/remove/:id', (req, res) => {
  const id = req.params.id
  
  const query = `DELETE FROM books WHERE id = ${id}`

  pool.query(query, function(err) {
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

  const data = ['title', 'n_pages', title, pages]

  const query = `INSERT INTO books (??, ??) VALUES (?, ?)`

  pool.query(query, data, function(err) {
    if (err) { console.log(err) }

    res.redirect('/books')
  })
})

app.listen(3000)