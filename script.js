'use strict'

class Calculator {
    constructor() {
        this.display = document.getElementById('display');
        this.digits = document.querySelectorAll('.number');
        this.operators = document.querySelectorAll('.operator');
        this.displayValues = [];
        this.displayValue = "";
        this.operatorMath = "";
        this.result = 0;
        this.populateDisplay();
        this.compute();
    }

    operate(values, operator) {
        if (operator == '+') {
            this.result = parseInt(values[0]) + parseInt(values[1]);
            this.display.textContent = this.result + this.operatorMath;
            this.displayValues = [];
            this.displayValue = "";
            this.displayValues.push(this.result);
            console.log(this.displayValues);
        } else if (operator == '-') {
            this.result = parseInt(values[0]) - parseInt(values[1]);
            this.display.textContent = this.result + this.operatorMath;;
            this.displayValues = [];
            this.displayValue = "";
            this.displayValues.push(this.result);
        } else if (operator == '*') {
            this.result = parseInt(values[0]) * parseInt(values[1]);
            this.display.textContent = this.result + this.operatorMath;;
            this.displayValues = [];
            this.displayValue = "";
            this.displayValues.push(this.result);
        } else {
            this.result = parseInt(values[0]) / parseInt(values[1]);
            this.display.textContent = this.result + this.operatorMath;;
            this.displayValues = [];
            this.displayValue = "";
            this.displayValues.push(this.result);
        }
    }
    compute(){
        this.operators.forEach(operator =>{
            operator.addEventListener('click', ()=>{
                this.operatorMath = operator.getAttribute('data-value');
                console.log(this.displayValues.length);
                if(this.displayValues.length == 0){
                    this.displayValues.push(this.displayValue);
                    this.result = this.displayValue;
                    this.displayValue = '';
                    this.display.textContent = this.result + this.operatorMath;
                    console.log(this.operatorMath);
                }else if(this.displayValues.length == 1){
                    this.displayValues.push(this.displayValue);
                    this.operate(this.displayValues, this.operatorMath);
                    // console.log(this.operatorMath);
                }else if(this.displayValues.length == 2){
                    this.displayValues.push(this.displayValue);
                    this.operate(this.displayValues, this.operatorMath);
                }
            })
        })
    }
    populateDisplay() {
        this.digits.forEach(digit => {
            digit.addEventListener('click', () => {
                    this.displayValue += digit.getAttribute('data-value');//.push(digit.getAttribute('data-value'));
                    this.display.textContent += digit.getAttribute('data-value');
                    console.log(this.displayValue);

                    if(digit.getAttribute('data-value') == 'clear'){
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
