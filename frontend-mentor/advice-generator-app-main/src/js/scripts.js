const btn = document.querySelector('button');
const apiUrl = 'https://api.adviceslip.com/advice';
const elId = document.getElementById('id');
const elAdvice = document.getElementById('advice')

btn.addEventListener('click', () => {

  fetch(apiUrl)
    .then((response) => response.json())
    .then((response) => {
      let id = response.slip.id;
      let advice = response.slip.advice;

      elId.innerHTML = id;
      elAdvice.innerHTML = advice;
    })

})




