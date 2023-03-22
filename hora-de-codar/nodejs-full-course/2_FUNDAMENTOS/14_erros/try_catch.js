//  throw: uma forma de encerrar o programa, gerando um novo erro
//  try, catch: erro exibindo mensagem tratada

const x = 10 

try { 
  x = 2
} catch(err) {
  console.log('HOuve um erro:', err)
}

console.log('...')