const carta1 = {
  nome: "Bulbasauro",
  atributos: {
    ataque: 7,
    defesa: 8,
    magia: 6
  }
};

const carta2 = {
  nome: "Darth Vader",
  atributos: {
    ataque: 9,
    defesa: 8,
    magia: 2
  }
};

const carta3 = {
  nome: "Shiryu de dragão",
  atributos: {
    ataque: 5,
    defesa: 9,
    magia: 10
  }
};

const cartas = [carta1, carta2, carta3];
let cartaMaquina;
let cartaJogador;

function sortearCarta() {
  let numeroCartaMaquina = parseInt(Math.random() * 3);
  cartaMaquina = cartas[numeroCartaMaquina];

  let numeroCartaJogador = parseInt(Math.random() * 3);
  while (numeroCartaMaquina == numeroCartaJogador) {
    numeroCartaJogador = parseInt(Math.random() * 3);
  }
  cartaJogador = cartas[numeroCartaJogador];
  console.log(cartaJogador);

  document.getElementById("btnSortear").disabled = true;
  document.getElementById("btnJogar").disabled = false;

  exibirOpcoes();
}

function exibirOpcoes() {
  const opcoes = document.getElementById("opcoes");
  let opcoesTexto = "";

  for (let atributo in cartaJogador.atributos) {
    opcoesTexto +=
      "<input type='radio' name='atributo' value='" +
      atributo +
      "'>" +
      atributo;
    }
    opcoes.innerHTML = opcoesTexto;
}

function obtemAtributoSelecionado() {
  const radioAtributos = document.getElementsByName("atributo");

  for (let i = 0; i < radioAtributos.length; i++) {
    if (radioAtributos[i].checked == true) {
      return radioAtributos[i].value;
    }
  }
}

function jogar() {
  const atributoSelecionado = obtemAtributoSelecionado();
  const elementoResultado = document.getElementById("resultado");
  const valorCartaJogador = cartaJogador.atributos[atributoSelecionado];
  const valorCartaMaquina = cartaMaquina.atributos[atributoSelecionado];

  if (valorCartaJogador > valorCartaMaquina) {
    elementoResultado.innerHTML = "Você venceu";
  } else if (valorCartaMaquina > valorCartaJogador) {
    elementoResultado.innerHTML = "Você perdeu, a carta da máquina é maior";
  } else {
    elementoResultado.innerHTML = "Empatou";
  }
}