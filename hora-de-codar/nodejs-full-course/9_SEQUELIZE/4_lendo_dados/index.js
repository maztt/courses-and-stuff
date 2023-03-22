const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

const User = require('./models/User')

const app = express()

app.use(
  express.urlencoded({
    extended: true
  })
) // middleware

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/users/create', (req, res) => {
  res.render('adduser')
})

app.get('/', async (req, res) => {

  const users = await User.findAll({raw: true})

  console.log(users)

  res.render('home', { users })
})

app.post('/users/create', async (req, res) => {

  const name = req.body.name
  const occupation = req.body.occupation
  const newsletter = req.body.newsletter

  if (newsletter === 'on') {
    newsletter = true
  }

  console.log(req.body)

  await User.create({name, occupation, newsletter})

  res.redirect('/')

})

conn
  .sync()
  .then(() => app.listen(3000))
  .catch(err => console.log(err))
