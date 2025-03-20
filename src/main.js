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
            result.textContent = new Function(`return ${equation}`)() || '0'
        } catch (error) {
            result.textContent = 'Error'
        }
    }

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (value === "=") {
                calcResult();
            } else if (value === "AC") {
                equation = '';
                result.textContent = '0';
                updateDisplay();
            } else {
                equation += value;
                updateDisplay();
            }
        })
    })
})