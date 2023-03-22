const mongoose = require('mongoose')

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/mongocourse')

  console.log('Conectado ao MongoDB utilizando Mongoose!')
}

main().catch((err) => console.error(err))

module.exports = mongoose