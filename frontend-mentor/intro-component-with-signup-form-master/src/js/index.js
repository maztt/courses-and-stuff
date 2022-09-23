const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const input = document.querySelectorAll('input');

const display_list = document.querySelectorAll('div.under-display')
const display_array = [...display_list];

const elements = [firstName, lastName, email, password]

function formValidator() {
  elements.forEach(element => {
    if (element.value === '') {
      element.classList.add('invalid-input');
    } else {
      element.classList.remove('invalid-input');
    }
  })

  if (elements[2].value === '') {
    elements[2].classList.add('invalid-email');
  }
  
  for (let i = 0; i <= display_array.length; i++) {
    if (elements[i].value === '') {
      display_array[i].classList.add('invalid');
    } else {
      display_array[i].classList.remove('invalid');
    }
  }
}
