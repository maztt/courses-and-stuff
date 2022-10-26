class Validator {

  constructor() {
    this.validations = [
      'data-required',
      'data-min-length',
      'data-max-length',
      'data-email-validate',
      'data-only-letters',
      'data-equal',
      'data-password-validate',
    ]
  }

  validate(form) {

    const currentValidations = document.querySelectorAll('form .error-validation');

    if (currentValidations.length > 0 ){
      this.clearValidations(currentValidations);
    }

    const inputs = form.getElementsByTagName('input');

    // HTMLCollection => array
    const inputsArray = [...inputs];

    inputsArray.forEach((input) => {
      
      for (let i = 0; this.validations.length > i; i++) {
        if (input.getAttribute(this.validations[i]) != null) {
          
          let method = this.validations[i].replace('data-', '').replace('-', '');

          let value = input.getAttribute(this.validations[i]);

          this[method](input, value);
          
        }
      }

    }, this)

  }

  minlength(input, minValue) {

    const inputLength = input.value.length;
    const errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`

    if (inputLength < minValue) {
      this.printMessage(input, errorMessage);
    }
  }

  maxlength(input, maxValue) {

    const inputLength = input.value.length;
    const errorMessage = `O campo precisa ter no máximo ${maxValue} caracteres`

    if (inputLength > maxValue) {
      this.printMessage(input, errorMessage);
    }
  }

  required(input) {

    const errorMessage = `Este campo é obrigatório!`

    if (!input.value) {
      this.printMessage(input, errorMessage);
    }
  }

  emailvalidate(input) {

    let re = /\S+@\S+\.\S+/;

    let email = input.value;

    const errorMessage = `Insira um e-mail no padrão email@email.com`;

    if (!re.test(email)) {
      this.printMessage(input, errorMessage);
    }
  }

  onlyletters(input) {

    let re = /^[A-Za-z]+$/;

    let inputValue = input.value;

    let errorMessage = `Este campo não aceita números e nem caracteres especiais`

    if (inputValue) {
      if (!re.test(inputValue)) {
        this.printMessage(input, errorMessage);
      }
    }
  }

  equal(input, inputName) {

    let inputToCompare = document.getElementsByName(inputName)[0];

    const errorMessage = `Este campo precisa estar igual ao ${inputName}`;

    if (input.value != inputToCompare.value) {
      this.printMessage(input, errorMessage);
    }    
  }

  passwordvalidate(input) {

    const errorMessage = `A senha precisa conter pelo menos 1 número e 1 letra maiúscula!`;

    let charArr = input.value.split("");

    let uppercases = 0;
    let numbers = 0;

    for (let i = 0; charArr.length > i; i++) {
      if (charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
        uppercases++;
      } else if (!isNaN(parseInt(charArr[i]))) {
        numbers++
      }
    }

    if (uppercases === 0 || numbers === 0) {
      this.printMessage(input, errorMessage);
    }
  }

  printMessage(input, msg) {

    let errorsQty = input.parentNode.querySelector('.error-validation');

    if (errorsQty === null) {
      const template = document.querySelector('.error-validation').cloneNode(true);
  
      template.textContent = msg;
  
      const inputParent = input.parentNode;
      template.classList.remove('template');
      inputParent.appendChild(template);
    }

  }


  clearValidations(validations) {
    validations.forEach(el => el.remove());
  }
}

const form = document.getElementById("register-form");
const submit = document.getElementById("btn-submit");

const validator = new Validator();

// EVENTS

submit.addEventListener("click", (e) => {
  e.preventDefault();

  validator.validate(form);
})