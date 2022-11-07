const btn = document.querySelector('button');

const adviceApi = {}

async function getAdvice() {
  const response = await fetch('https://api.adviceslip.com/advice');
  return response;
}



btn.addEventListener('click', () => {
  console.log(getAdvice());
})




