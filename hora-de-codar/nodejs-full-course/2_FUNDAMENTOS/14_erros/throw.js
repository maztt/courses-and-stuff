//  throw: uma forma de encerrar o programa, gerando um novo erro
//  try, catch: erro exibindo mensagem tratada

const x = "10"

if (!Number.isInteger(x)) {
  throw new Error("O valor de X não é um número inteiro!")
} // Aqui encerra o programa

console.log("...")