document.addEventListener('DOMContentLoaded', function () {
    const loadingContainer = document.querySelector('.loading-container');
    const calculator = document.getElementById('calculator');
    const buttons = document.querySelectorAll('.btn');
    const screen = document.querySelector('.calculator-screen');
    let currentInput = '';
    let operator = '';
    let previousInput = '';

   //TO END THE LOADING SCREEN
    setTimeout(() => {
        loadingContainer.style.display = 'none';
        calculator.style.display = 'block';
    }, 2000);

    function updateScreen(value) {
        screen.value = value;
    }

    function handleButtonClick(action, number) {
        if (number !== undefined) {
            currentInput += number;
            updateScreen(currentInput);
        }

        if (action === 'clear') {
            currentInput = '';
            operator = '';
            previousInput = '';
            updateScreen('');
        }

        if (action === 'delete') {
            currentInput = currentInput.slice(0, -1);
            updateScreen(currentInput);
        }

        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            if (currentInput === '') return;
            operator = action;
            previousInput = currentInput;
            currentInput = '';
            updateScreen('');
        }

        if (action === 'equals') {
            if (currentInput === '' || previousInput === '') return;
            let result;
            switch (operator) {
                case 'add':
                    result = parseFloat(previousInput) + parseFloat(currentInput);
                    break;
                case 'subtract':
                    result = parseFloat(previousInput) - parseFloat(currentInput);
                    break;
                case 'multiply':
                    result = parseFloat(previousInput) * parseFloat(currentInput);
                    break;
                case 'divide':
                    result = parseFloat(previousInput) / parseFloat(currentInput);
                    break;
            }
            updateScreen(result);
            currentInput = result;
            previousInput = '';
            operator = '';
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.dataset.action;
            const number = button.dataset.number;
            handleButtonClick(action, number);
        });
    });

    // Keyboard support
    document.addEventListener('keydown', (event) => {
        if (!isNaN(event.key) || event.key === '.') {
            handleButtonClick(null, event.key);
        } else if (event.key === 'Enter' || event.key === '=') {
            handleButtonClick('equals');
        } else if (event.key === 'Backspace') {
            handleButtonClick('delete');
        } else if (event.key === 'Escape') {
            handleButtonClick('clear');
        } else if (event.key === '+') {
            handleButtonClick('add');
        } else if (event.key === '-') {
            handleButtonClick('subtract');
        } else if (event.key === '*') {
            handleButtonClick('multiply');
        } else if (event.key === '/') {
            handleButtonClick('divide');
        }
    });
});
