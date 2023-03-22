const url = require('url')

const address = 'https://www.meusite.com.br/catalog?produtos=cadeira'
const parsedUrl = new url.URL(address)

console.log(parsedUrl.host) // site
console.log(parsedUrl.pathname) // página que está
console.log(parsedUrl.search) // o que está pesquisando na página
console.log(parsedUrl.searchParams) // pesquisando em específico
console.log(parsedUrl.searchParams.get('produtos')) // extrair a pesquisa
