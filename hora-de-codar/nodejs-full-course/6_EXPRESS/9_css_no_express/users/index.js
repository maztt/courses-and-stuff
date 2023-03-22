const express = require('express')
const router = express.Router()
const path = require('path')

const absolutePath = path.join(__dirname, '../templates')

router.get('/add', (req, res) => {
  res.sendFile(`${absolutePath}/userform.html`)
})

router.post('/save', (req, res) => {
  console.log(req.body)

  const name = req.body.name
  const age = req.body.age

  console.log(`${name} tem ${age}`)

  res.sendFile(`${absolutePath}/userform.html`)
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  console.log('user:', id)

  res.sendFile(`${absolutePath}/users.html`)
})

module.exports = router