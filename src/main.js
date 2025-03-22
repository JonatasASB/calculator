document.addEventListener('DOMContentLoaded', () => {
    const $ = (element) => document.querySelector(element)
    const $$ = (element) => document.querySelectorAll(element)

    let calculation = $('#calculation')
    let result = $('#result')
    let buttons = $$('button')
    let equation = '';



    function updateDisplay() {
        calculation.textContent = equation
    }
    function calcResult() {
        try {
            result.textContent = new Function(`return ${equation}`)() || 0
        } catch (error) {
            result.textContent = 'Error'
        }
    }
    function addChar(char) {
        let lastChar = equation[equation.length - 1];
        if (isOperator(lastChar) && isOperator(char)) {
            return true
        }
    }
    function isOperator(char) {
        return ['+', '*', '/', '.'].includes(char);
    }
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (button.id === "backspace") {
                equation = equation.slice(0, -1);
                updateDisplay();
            }
            else if (value === "=") {
                calcResult();
            } else if (value === "AC") {
                calculation.textContent = '';
                equation = '';
                result.textContent = ''
                updateDisplay();
            } else {
                if (!addChar(value)) {
                    equation += value;
                    updateDisplay();
                } else {
                    return;
                }
            }
        })
    })
    document.addEventListener('keyup', (e) => {
        let key = e.key;

        if (key === "Backspace") {
            equation = equation.slice(0, -1);
            updateDisplay();
        }
        if (!isNaN(key) || "+-*./".includes(key)) {
            if (!addChar(key)) {
                equation += key;
                updateDisplay();
            } else {
                return;
            }
        }
        else if (key === "Enter") {
            calcResult();
        }
        else if (key === "Escape") {
            calculation.textContent = '';
            equation = ''
            result.textContent = '';
            updateDisplay();
        }
    })
})