function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	return a / b;
}

let firstNum = 0;
let secondNum = 0;
let operator = "";
let result = "";

function operate(firstNum, secondNum, operator) {
  firstNum = parseInt(firstNum);
  secondNum = parseInt(secondNum);
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

const buttonsList = document.querySelector("#buttons-list");
buttonsList.addEventListener("click", (event) => {
	const target = event.target;
	if (target.classList.contains("operator")) {
		operator = target.textContent;
	} else if (target.classList.contains("number")) {
		if (!!operator) {
			if (secondNum > 0) {
				secondNum += target.textContent;
			} else {
				secondNum = target.textContent;
			}
		} else {
			if (firstNum > 0) {
				firstNum += target.textContent;
			} else {
				firstNum = target.textContent;
			}
		}
	} else if (target.id === "equals") {
    result = operate(firstNum, secondNum, operator);
  }
  
  if (!!result) {
		document.querySelector("#display-span").textContent =
    firstNum + operator + secondNum + "=" + result;
  } else if (!!secondNum) {
		document.querySelector("#display-span").textContent =
			firstNum + operator + secondNum;
	} else if (!!operator) {
		document.querySelector("#display-span").textContent = firstNum + operator;
	} else {
		document.querySelector("#display-span").textContent = firstNum;
	}
});
