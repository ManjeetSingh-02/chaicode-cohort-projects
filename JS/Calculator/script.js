let display = document.getElementById("display");

let v1 = null;
let v2 = null;
let currOperation = null;
let totalValue = 0;

function input(value) {
  if (v1 === null) {
    v1 = value;
    display.innerText = v1;
  } else {
    v2 = value;
    display.innerText = display.innerText.toString() + " " + v2;
  }
}

function operation(op) {
  currOperation = op;
  display.innerText = display.innerText.toString() + " " + currOperation;
}

function calculate() {
  if (v1 && v2 && currOperation) {
    switch (currOperation) {
      case "+":
        totalValue = v1 + v2;
        break;
      case "-":
        totalValue = v1 - v2;
        break;
      case "*":
        totalValue = v1 * v2;
        break;
      case "/":
        totalValue = v1 / v2;
        break;
    }
    display.innerHTML = totalValue;
    v1 = totalValue;
    v2 = null;
    currOperation = null;
  }
}

function clearDisplay() {
  display.innerText = "0";
  v1 = null;
  v2 = null;
  currOperation = null;
  totalValue = 0;
}
