const display = document.getElementById('display');
let expression = '';

function updateDisplay() {
  display.value = expression || '0';
}

function evaluateExpression(expr) {
  const sanitized = expr.replace(/[^0-9+\-*/().]/g, '');

  if (!sanitized) {
    return '0';
  }

  try {
    const result = Function(`"use strict"; return (${sanitized})`)();
    return Number.isFinite(result) ? String(result) : 'Error';
  } catch {
    return 'Error';
  }
}

function handleInput(value) {
  if (value === 'clear') {
    expression = '';
    updateDisplay();
    return;
  }

  if (value === 'backspace') {
    expression = expression.slice(0, -1);
    updateDisplay();
    return;
  }

  if (value === '=') {
    expression = evaluateExpression(expression);
    updateDisplay();
    return;
  }

  if (expression === 'Error') {
    expression = '';
  }

  expression += value;
  updateDisplay();
}

document.querySelectorAll('.btn').forEach((button) => {
  button.addEventListener('click', () => handleInput(button.dataset.value));
});

document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (/^[0-9.+\-*/()]$/.test(key)) {
    handleInput(key);
    event.preventDefault();
  } else if (key === 'Enter' || key === '=') {
    handleInput('=');
    event.preventDefault();
  } else if (key === 'Backspace') {
    handleInput('backspace');
    event.preventDefault();
  } else if (key === 'Escape') {
    handleInput('clear');
    event.preventDefault();
  }
});

updateDisplay();
