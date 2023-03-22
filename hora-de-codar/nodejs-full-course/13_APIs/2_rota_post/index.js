const express = require('express')
const app = express()

app.use(express.urlencoded({
  extended:true
}))

app.use(express.json())


app.post('/createproduct', (req, res) => {
  const name = req.body.name
  const price = req.body.price

  console.log(name, price)

  res.json({
    message: `O produto ${name}, de preço ${price} foi criado!`
  })
})

app.get('/', (req, res) => {
  res.json({
    message: 'Primeira rota criada'
  })
})

app.listen(3000)