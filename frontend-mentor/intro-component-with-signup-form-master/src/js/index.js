const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const input = document.querySelectorAll('input');

function formValidator() {
  if (firstName == '') {
    firstName.validationMessage('abc');
    firstName.setCustomValidity('dsa')
  }
}

// firstName.addEventListener("blur", () => {
//   if (firstName.isEmpty()) {

//   } else {

//   }
// })