'use strict'

class Calculator {
    constructor() {
        this.display = document.getElementById('display');
        this.digits = document.querySelectorAll('.grid');
        this.displayValues = [];
        this.displayValue = "";
        this.populateDisplay();
    }

    add(x, y) {
        return x + y;
    }
    substract(x, y) {
        return x - y;
    }
    multiply(x, y) {
        return x * y;
    }
    divide(x, y) {
        return x / y;
    }
    operate(array) {
        if (array[1] == '+') {
            return this.add(x, y);
        } else if (array[1] == '-') {
            return this.substract(x, y);
        } else if (array[1] == '*') {
            return this.multiply(x, y)
        } else {
            return this.divide(x, y);
        }
    }
    populateDisplay() {
        this.digits.forEach(digit => {
            digit.addEventListener('click', () => {
                if ((digit.getAttribute('data-value') >= '0') && (digit.getAttribute('data-value') <= 9)) {
                    this.displayValue += digit.getAttribute('data-value');//.push(digit.getAttribute('data-value'));
                    this.display.textContent += digit.getAttribute('data-value');
                    console.log(this.displayValue);
                } else if ((digit.getAttribute('data-value') == '+') || (digit.getAttribute('data-value') == '-') || (digit.getAttribute('data-value') == '*') || (digit.getAttribute('data-value') == '/')) {
                    this.displayValues.push(this.displayValue);
                    this.displayValues.push(digit.getAttribute('data-value'));
                    this.displayValue = '';
                    this.display.textContent += digit.getAttribute('data-value');
                    console.log(this.displayValues);
                } else if (digit.getAttribute('data-value') == 'clear'){
                    this.clearAll();
                }
            });
        })
    }
    clearAll(){
        this.displayValue = '';
        this.displayValues = [];
        this.display.textContent = '';
    }
}

let calc = new Calculator();
