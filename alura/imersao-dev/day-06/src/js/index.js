var rafa = {
  nome: "rafa",
  vitorias: 2,
  empates: 1,
  derrotas: 0,
  pontos: 0
};

var paulo = {
  nome: "paulo",
  vitorias: 1,
  empates: 3,
  derrotas: 0,
  pontos: 0
};

var jogadores = [rafa, paulo];


function calculaPontos(jogador) {
  var pontos = (jogador.vitorias * 3) + jogador.empates
  return pontos
}

function exibirJogadores (jogadores) {
  var elem = "";  
  for (let i = 0; i < jogadores.length; i++) {
    elem += "<tr><td>" + jogadores[i].nome + "</td>"
    elem += "<td>" + jogadores[i].vitorias + "</td>"
    elem += "<td>" + jogadores[i].empates + "</td>"
    elem += "<td>" + jogadores[i].derrotas + "</td>"
    elem += "<td>" + jogadores[i].pontos + "</td>"
    elem += "<td><button onClick='adicionarVitoria(" + i + ")'>Vitória</button></td>"
    elem += "<td><button onClick='adicionarEmpate(" + i + ")'>Empate</button></td>"
    elem += "<td><button onClick='adicionarDerrota(" + i + ")'>Derrota</button></td>"
    elem += "</tr>"
  }

  var tabelaJogadores = document.getElementById('tabelaJogadores');
  tabelaJogadores.innerHTML = elem
}


exibirJogadores(jogadores)

function adicionarVitoria(i) {
  var jogador = jogadores[i]
  jogador.vitorias++
  jogador.pontos = calculaPontos(jogador) 
  exibirJogadores(jogadores)
}

function adicionarEmpate(i) {
  var jogador = jogadores[i]
  jogador.empates++
  jogador.pontos = calculaPontos(jogador) 
  exibirJogadores(jogadores)
}

function adicionarDerrota(i) {
  var jogador = jogadores[i]
  jogador.derrotas++
  jogador.pontos = calculaPontos(jogador) 
  exibirJogadores(jogadores)
}