const express = require('express')
const app = express()

app.use(express.urlencoded({
  extended:true
}))

app.use(express.json())


// Respostas de informação (100-199)
// Respostas de sucesso (200-299)
// Redirecionamentos (300-399)
// Erros do cliente (400-499)
// Erros do servidor (500-599)

app.post('/createproduct', (req, res) => {
  const name = req.body.name
  const price = req.body.price

  if (!name) {
    res.status(422).json({message: "O campo nome é obrigatório!"})
    return
  }

  console.log(name, price)

  res.status(201).json({
    message: `O produto ${name}, de preço ${price} foi criado!`
  })
})

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Primeira rota criada'
  })
})

app.listen(3000)