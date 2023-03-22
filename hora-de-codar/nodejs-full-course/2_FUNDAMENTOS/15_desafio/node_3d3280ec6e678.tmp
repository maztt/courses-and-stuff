const chalk = require('chalk')
const inquirer = require('inquirer')

inquirer
  .prompt([
    {
      name: 'p1',
      message: 'Qual o seu nome?'
    },
    {
      name: 'p2',
      message: 'Qual a sua idade?'
    }
  ])
  .then(
    (response) => {

      if (!response.p1 || !response.p2) {
        throw new Error(chalk.red('O nome e idade são obrigatórios!'))
      }

      console.log(chalk.bgYellow.black(`O nome é: ${response.p1}`))
      console.log(chalk.bgYellow.black(`A idade é: ${response.p2}`))
    }
  )
  .catch((err) => console.log(chalk.red('Houve um ERROZÃO:'), err))
