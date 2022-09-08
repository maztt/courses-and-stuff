function converterValor() {
  const pixels = document.getElementById('valor').value
  const pixelsToEm = pixels * 0.0625

  valorConvertido.innerHTML = ''
  valorConvertido.innerHTML += `${pixels}px são ${pixelsToEm}em;`
 
}