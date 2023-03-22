const express = require('express')
const app = express()
const projectsRoutes = require('./projects')

const port = 5000

app.use(express.static('public'))

app.use('/projects', projectsRoutes)

app.listen(port, () => {
  console.log('Rodando')
})