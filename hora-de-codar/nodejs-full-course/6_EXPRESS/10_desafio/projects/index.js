const express = require('express')
const router = express.Router()

const path = require('path')

const absolutePath = path.join(__dirname, '../templates')

router.get('/:id', (req, res) => {
  res.sendFile(`${absolutePath}/project.html`)
})


router.get('/', (req, res) => {
  res.sendFile(`${absolutePath}/projects.html`)
})


module.exports = router
