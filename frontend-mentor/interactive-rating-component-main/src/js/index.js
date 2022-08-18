let selectedRate

function setRate(num) {
  for (let i = 1; i <= 5; i++) {
    document.getElementById(`rate-${i}`).classList.remove('clicked')
  }
  document.getElementById(`rate-${num}`).classList.add('clicked')
  selectedRate = num
}

function submitRate() {
  // Pega o rate
  // Seta visibility
  // Seta innerhtml
}
