const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {

  constructor(previousOperationText, currentOperationText) {
    // RESULTS ON SCREEN
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;

    // TYPING NOW
    this.currentOperation = ""
  }

  addDigit(digit) {

    if (digit === '.' && this.currentOperationText.innerText.includes(".")) {
      return;
    }

    this.currentOperation = digit;
    this.updateScreen();
  }

  processOperation(operation) {

    if (this.currentOperationText.innerText === "" && operation !== "C") {
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;


    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "=":
        this.processEqualOperator();
        this.currentOperationText.innerHTML = this.previousOperationText.innerHTML.split(' ')[0];
        this.previousOperationText.innerHTML = '';
        break;
      case "DEL":
        this.processDelOperator();
        break;
      case "CE":
        this.processClearCurrentOperation();
        break;
      case "C":
        this.processClearAllOperations();
        break;
      default:
        return;
    }

  }

  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {


    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      if (previous === 0) {
        operationValue = current;
      }

      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

  changeOperation(operation) {

    const mathOperations = [
      "*",
      "/",
      "+",
      "-"
    ]

    if (!mathOperations.includes(operation)) {
      return;
    }

    this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  processDelOperator() {
    this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
  }

  processClearCurrentOperation() {
    this.currentOperation.innerText = "";
  }

  processClearAllOperations() {
    this.currentOperation.innerText = "";
    this.previousOperationText.innerText = "";
  }

  processEqualOperator() {
    let operation = previousOperationText.innerText.split(" ")[1];

    this.processOperation(operation);
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {

      const value = e.target.innerText;

      if (+value >= 0 || value === ".") {
        calc.addDigit(value);
      } else {
        calc.processOperation(value);
      }
  })
})

window.addEventListener("keydown", (e) => {

  const value = e.key

  if(+value >= 0 || value === ".") {
      calc.addDigit(value)
  } else {
      calc.processOperation(value)
  }

  if(value == "Enter") {
      calc.processOperation("=")
  }
})