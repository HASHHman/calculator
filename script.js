let firstNum = 0;
let secondNum = 0;
let operator = "";
let errorText = "";
const buttonsList = document.querySelector("#buttons-list");

function add(a, b) {
	return Math.round((a + b) * 100) / 100;
}

function subtract(a, b) {
	return Math.round((a - b) * 100) / 100;
}

function multiply(a, b) {
	return Math.round(a * b * 100) / 100;
}

function divide(a, b) {
	if (!b) {
		errorText = "can't divide by zero";
		return 0;
	}
	return Math.round((a / b) * 100) / 100;
}

function operate(firstNum, secondNum, operator) {
	firstNum = parseFloat(firstNum);
	secondNum = parseFloat(secondNum);
	switch (operator) {
		case "+":
			return add(firstNum, secondNum);
			break;
		case "-":
			return subtract(firstNum, secondNum);
			break;
		case "*":
			return multiply(firstNum, secondNum);
			break;
		case "/":
			return divide(firstNum, secondNum);
			break;
	}
}

function populate() {
	if (!!errorText) {
		document.querySelector("#display-span").textContent = errorText;
		errorText = "";
	} else if (!!secondNum) {
		document.querySelector("#display-span").textContent =
			firstNum + operator + secondNum;
	} else if (!!operator) {
		document.querySelector("#display-span").textContent = firstNum + operator;
	} else {
		document.querySelector("#display-span").textContent = firstNum;
	}
}

function processEvent(event) {
  const input = event.type == "click" ? event.target.textContent : event.key;
  const operators = ["+", "-", "*", "/", "=", "Enter"];
  console.log(input);
  
	if (operators.includes(input)) {
		if (input === "=" || input === "Enter") {
			if (!(!firstNum || !operator || !secondNum)) {
				firstNum = operate(firstNum, secondNum, operator);
				operator = "";
				secondNum = 0;
			}
		} else if (!!operator) {
			firstNum = operate(firstNum, secondNum, operator);
			operator = input;
			secondNum = 0;
		} else {
			operator = input;
		}
	} else if (0 <= parseInt(input)) {
		if (!!operator) {
			if (secondNum === "0." || !(secondNum == 0)) {
				secondNum += input;
			} else {
				secondNum = "" + input;
			}
		} else {
			if (firstNum === "0." || !(firstNum == 0 )) {
				firstNum += input;
			} else {
				firstNum = "" + input;
			}
		}
	} else if (input === ".") {
		if (!!secondNum) {
			if (!secondNum.includes(".")) {
				secondNum += ".";
			}
		} else if (!secondNum && !!operator) {
			secondNum = "0.";
		} else if (!!firstNum) {
			if (!firstNum.includes(".")) {
				firstNum += ".";
			}
		} else {
			firstNum = "0.";
		}
	} else if (input === "Clear" || input === "Delete") {
		firstNum = 0;
		secondNum = 0;
		operator = "";
	} else if (input === "Back" || input === "Backspace") {
		if (!!secondNum) {
			secondNum = secondNum.slice(0, -1);
		} else if (!!operator) {
			operator = "";
		} else {
			firstNum = firstNum.slice(0, -1);
		}
	}

	populate();
}

buttonsList.addEventListener("click", processEvent);

document.addEventListener("keydown", processEvent);
