let selectedRate

function setRate(num) {
  for (let i = 1; i <= 5; i++) {
    document.getElementById(`rate-${i}`).classList.remove('clicked')
  }
  document.getElementById(`rate-${num}`).classList.add('clicked')
  selectedRate = num
}

function submitRate() {
  const rating = document.getElementById('rating-return-text')
  rating.innerHTML = `You selected ${selectedRate} out of 5`
  const containerFirstPage = document.getElementById('first-page')
  containerFirstPage.style.visibility = 'hidden'
  const containerSecondPage = document.getElementById('second-page')
  containerSecondPage.style.visibility = 'visible'
}
