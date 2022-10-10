const errorDisplay = document.getElementById('div#error');
const inputEmail = document.getElementById('email');


console.log(inputEmail);

function formValidator () {
  if (inputEmail.checkValidity() == false) {
    errorDisplay.style.display = 'visible';
  }


}