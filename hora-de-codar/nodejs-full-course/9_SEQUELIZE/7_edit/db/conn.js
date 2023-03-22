const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodesequelize2', 'root', '', { //db, user, password
  host: 'localhost',
  dialect: 'mysql'
})

try {
  sequelize.authenticate()
  console.log('Conectado com sucesso.')
} catch(err) {
  console.log('Não foi possível conectar: ', err)
}

module.exports = sequelize