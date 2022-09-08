function adivinharNumero() {
  var numeroSecreto = parseInt(Math.random() * 11);

  const elementoResultado = document.getElementById("resultado");
  const chute = parseInt(document.getElementById("valor").value);

  if (chute == numeroSecreto) {
    elementoResultado.innerHTML = "Acertou!"
  } else if (chute > 10 || chute < 0) {
    elementoResultado.innerHTML = "Você precisa informar um número entre 0 e 10";
  } else {
    elementoResultado.innerHTML = "Errou, o número secreto é o " + numeroSecreto;
  }
}