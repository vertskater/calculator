'use strict'

class Calculator {
    constructor() {
        this.displayValue = '0';
        this.firstNumber = null;
        this.waitingForsecondNumber = false;
        this.operator = null;
        this.keys = document.querySelector('#digits');
        this.display = document.querySelector('#display');
        this.updateDisplay();
        this.listenToKeys();
    }
    inputDigits(digit) {
        if (this.waitingForsecondNumber === true) {
            this.displayValue = digit;
            this.waitingForsecondNumber = false;
        } else {
            this.displayValue = this.displayValue === '0' ? digit : this.displayValue + digit;
        }
    }
    inputDecimal(dot) {
        if (this.waitingForsecondNumber === true) {
            this.displayValue = '0.';
            this.waitingForsecondNumber = false;
            return
        }
        if (!this.displayValue.includes(dot)) {
            this.displayValue += dot;
        }
    }
    handleOperator(nextOperator) {
        const inputValue = parseFloat(this.displayValue);
        if (this.operator && this.waitingForsecondNumber) {
            this.operator = nextOperator;
            return
        }

        if (this.firstNumber === null && !isNaN(inputValue)) {
            this.firstNumber = inputValue;
        } else if (this.operator) {
            const result = this.calculate(this.firstNumber, inputValue, this.operator);
            this.displayValue = `${parseFloat(result.toFixed(7))}`;
            this.firstNumber = result;
        }
        this.waitingForsecondNumber = true;
        this.operator = nextOperator;
    }
    calculate(firstNumber, secondNumber, operator) {
        if (operator === '+') {
            return firstNumber + secondNumber;
        } else if (operator === '-') {
            return firstNumber - secondNumber;
        } else if (operator === '*') {
            return firstNumber * secondNumber;
        } else if (operator === '/') {
            return firstNumber / secondNumber;
        }
        return secondNumber;
    }
    updateDisplay() {
        this.display.textContent = this.displayValue;
    }
    resetCalculator() {
        this.displayValue = '0';
        this.firstNumber = null;
        this.waitingForsecondNumber = false;
        this.operator = null;
    }
    listenToKeys() {
        this.keys.addEventListener('click', (e) => {
            if (e.target.matches('.grid')) {
                this.key = e.target;
                this.action = this.key.dataset.action;
                this.keyContent = this.key.getAttribute('data-value');

                if (!this.action) {
                    this.inputDigits(this.keyContent);
                    this.updateDisplay();
                }

                if ((this.action === '+') ||
                    (this.action === '-') ||
                    (this.action === '*') ||
                    (this.action === '/') ||
                    (this.action === '=')) {
                    this.handleOperator(this.action);
                    this.updateDisplay();
                }

                if (this.action == '.') {
                    this.inputDecimal(this.action);
                    this.updateDisplay;
                }
                if (this.action == 'clear') {
                    this.resetCalculator();
                    this.updateDisplay();
                }

            }
        })
    }
    listenToKeyboard() {
        document.addEventListener('keydown', (e) => {
            const key = e.key
            if (isFinite(key)) {
                this.inputDigits(key);
                this.updateDisplay();
            }
            if(key == 'Enter' ){
                this.handleOperator('=');
                this.updateDisplay();
            }
            if(
                (key == '-') ||
                (key == '+') ||
                (key == '*') ||
                (key == '/')           
            ){
                this.handleOperator(key);
                this.updateDisplay();
            }
        })
    }
}

let calc = new Calculator();
calc.listenToKeyboard();