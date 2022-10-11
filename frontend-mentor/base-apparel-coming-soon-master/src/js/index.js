const errorDisplay = document.getElementById('text-error');
const inputEmail = document.getElementById('email');
const btnSubmit = document.getElementById('submit');

const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;


btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();


  if ( emailRegEx.test(inputEmail.value) ) {
    errorDisplay.style.visibility = "hidden";
    inputEmail.classList.remove("error");
  } else {
    errorDisplay.style.visibility = "visible";
    inputEmail.classList.add("error");
  }

})
