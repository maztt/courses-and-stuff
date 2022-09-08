const button = document.querySelector('.button')

button.addEventListener("mousedown", () => {
    const n1 = Number(document.getElementById('n1').value)
    const n2 = Number(document.getElementById('n2').value)
    const n3 = Number(document.getElementById('n3').value)
    const resultado = document.querySelector('.resultado')
    
    const result = (n1 + n2 + n3) / 3
    resultado.innerHTML = result;
});