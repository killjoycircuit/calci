let display = document.getElementById('display');
let currentInput = '';
let shouldReset = false;

function appendNumber(number) {
  if (shouldReset) {
    currentInput = '';
    shouldReset = false;
  }

  currentInput += number;
  updateDisplay();
}

function appendOperator(operator) {
  if (shouldReset) {
    shouldReset = false;
  }

  if (/[+\-*/]$/.test(currentInput)) {
    currentInput = currentInput.slice(0, -1) + operator;
  } else {
    currentInput += operator;
  }

  updateDisplay();
}

function appendDecimal() {
  if (shouldReset) {
    currentInput = display.textContent.includes('.') ? display.textContent : display.textContent + '.';
    shouldReset = false;
    updateDisplay();
    return;
  }

  const parts = currentInput.split(/[\+\-\*\/]/);
  const lastPart = parts[parts.length - 1];

  if (!lastPart.includes('.')) {
    if (currentInput === '' || /[+\-*/]$/.test(currentInput)) {
      currentInput += '0.';
    } else {
      currentInput += '.';
    }
    updateDisplay();
  }
}

function clearDisplay() {
  currentInput = '';
  updateDisplay('0');
}

function backspace() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput || '0');
}

function calculate() {
  try {
    const result = eval(currentInput);
    if (!isFinite(result)) {
      updateDisplay('Error');
    } else {
      updateDisplay(result);
      currentInput = result.toString();
    }
  } catch (e) {
    updateDisplay('Error');
  }
  shouldReset = true;
}

function updateDisplay(value = currentInput) {
  display.textContent = value;
}

document.addEventListener('keydown', (e) => {
  const key = e.key;

  if (!isNaN(key)) {
    appendNumber(key);
  } else if (['+', '-', '*', '/'].includes(key)) {
    appendOperator(key);
  } else if (key === '.' || key === ',') {
    e.preventDefault();
    appendDecimal();
  } else if (key === 'Enter' || key === '=') {
    e.preventDefault();
    calculate();
  } else if (key === 'Backspace') {
    backspace();
  } else if (key === 'Escape' || key.toLowerCase() === 'c') {
    clearDisplay();
  }
});
