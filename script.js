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

buttonsList.addEventListener("click", (event) => {
	const target = event.target;
	if (target.classList.contains("operator")) {
		if (target.id === "equals") {
			if (!(!firstNum || !operator || !secondNum)) {
				firstNum = operate(firstNum, secondNum, operator);
				operator = "";
				secondNum = 0;
			}
		} else if (!!operator) {
			firstNum = operate(firstNum, secondNum, operator);
			operator = target.textContent;
			secondNum = 0;
		} else {
			operator = target.textContent;
		}
	} else if (target.classList.contains("number")) {
		if (!!operator) {
			if (!(secondNum == 0)) {
				secondNum += target.textContent;
			} else {
				secondNum = target.textContent;
			}
		} else {
			if (!(firstNum == 0)) {
				firstNum += target.textContent;
			} else {
				firstNum = target.textContent;
			}
		}
	} else if (target.id === "dot") {
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
      firstNum = "0."
    }
  }else if (target.id === "clear") {
		firstNum = 0;
		secondNum = 0;
		operator = "";
	} else if (target.id === "back") {
		if (!!secondNum) {
			secondNum = secondNum.slice(0, -1);
		} else if (!!operator) {
			operator = "";
		} else {
			firstNum = firstNum.slice(0, -1);
		}
	}

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
});
