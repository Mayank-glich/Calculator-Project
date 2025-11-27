const calculatorDisplay = document.querySelector('h2');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.querySelector('.clear');
const toggleBtn = document.getElementById("theme-toggle");

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    // Change button text
    if (document.body.classList.contains("dark-theme")) {
        toggleBtn.textContent = "Light Mode";
    } else {
        toggleBtn.textContent = "Dark Mode";
    }
});



let firstValue = 0;
let operatorValue = "";
let awaitingValue = false;

function sendByNumber(number) {
    if (awaitingValue) {
        calculatorDisplay.textContent = number;
        awaitingValue = false;
    } else {
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

function addDecimal() {
    if (awaitingValue) return;
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

const calculate = {
    '/': (firstNumber, secondNumber) => {
        if (secondNumber === 0) {
            alert('Cannot divide by zero!');
            return firstNumber;
        }
        return firstNumber / secondNumber;
    },
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber,
};
function useoperator(operator) {
    const currValue = Number(calculatorDisplay.textContent);
    if (operatorValue && awaitingValue && operator !== '=') {
        operatorValue = operator;
        return;
    }
    // Assigning the first value
    if (!firstValue) {
        firstValue = currValue;
    } else {
        console.log(firstValue, operatorValue, currValue);
        const calculation = calculate[operatorValue](firstValue, currValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    if (operator === '=') {

        operatorValue = "";
        awaitingValue = false;
    } else {
        operatorValue = operator;
        awaitingValue = true;
    }
}

// Add all Event listener button in operator..
inputBtns.forEach((button) => {
    if (button.classList.length === 0 || button.classList.contains('oprator')) {
        button.addEventListener('click', () => sendByNumber(button.value));
    } else if (button.classList.contains('oprator-oprand')) {
        button.addEventListener('click', () => useoperator(button.value));
    } else if (button.classList.contains('decimal')) {
        button.addEventListener('click', () => addDecimal());
    } else if (button.classList.contains('clear')) {

    } else if (button.classList.contains('equal-sign')) {
        button.addEventListener('click', () => useoperator(button.value));
    }
});

// We  will to Reset all Button
function ResetAll() {
    firstValue = 0;
    operatorValue = "";
    awaitingValue = false;
    calculatorDisplay.textContent = '0';
}

clearBtn.addEventListener('click', ResetAll);
