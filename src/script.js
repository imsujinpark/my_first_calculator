// require('..dist/style.css');

const calculator = document.querySelector('.calculator'); // contains calculator element and its child elements
const buttons = calculator.querySelector('.calculator__buttons'); // contains calculator__keys element and its child elements
const display = document.querySelector('.calculator__display--for-advanced'); // contains calculator__display element and its child elements

// Based on the operator used, make a calculation of the two numbers.
function calculate(n1, operator, n2) {
  let result = 0;

  if (operator === '+') {
    result = n1 + n2;
  }
  else if (operator === '-') {
    result = n1 - n2;
  }
  else if (operator === '*') {
    result = n1 * n2;
  }
  else if (operator === '/') {
    result = n1 / n2;
  }

  return String(result);
}

let number1 = 0; // first operand
let number2 = 0; // second operand
let whichOperator = ''; // which operator is used
let previousKey; // previous button class used

buttons.addEventListener('click', function (event) {

  const target = event.target; // clicked HTML element info is saved 
  const action = target.classList[0]; // takes the class info of the clicked HTML element
  const buttonContent = target.textContent; // takes the text info of the clicked HTML element
  // ! Do not edit line 32-34.

  if (target.matches('button')) {

    // if the clicked button is a number
    if (action === 'number') {
      console.log('숫자 ' + buttonContent + ' 버튼');
      if (display.textContent === '0') { // if the first number has not yet been assigned
        number1 = number1 + Number(buttonContent); 
        display.textContent = number1; 
      }
      else if (whichOperator === '') { // if first number is already assigned but no operator has been used yet
        number1 = number1 + buttonContent; 
        display.textContent = number1;
      }
      else if (whichOperator !== '' && number2 === 0) { // if an operator has been used and there is no secondOperend value assigned
        number2 = number2 + Number(buttonContent);  
        display.textContent = number2; 
      }
      else if (whichOperator !== '' && number2 !== 0) { // if an operator has been used, secondOperend has a non-zero value, but a new number has been entered
        number2 = number2 + buttonContent; 
        display.textContent = number2;
      }
      previousKey = 'number'; // previous key used is a 'number' at this point
    }

    // if the clicked button is an operator
    if (action === 'operator') {
      console.log('연산자 ' + buttonContent + ' 버튼');

      if (display.textContent === '0' ) { // if no number has been entered yet
        console.log('Please input a number value first')
      }
      else if (previousKey === 'operator') { // if operators are clicked in a row
        whichOperator = buttonContent; 
      }
      else if (whichOperator !== '' && previousKey !== 'calculate') { // making a consecutive calculation without pressing 'enter' 
        let answer = calculate(Number(number1), whichOperator, Number(number2)); 
        number1 = answer; 
        number2 = 0; 
        whichOperator = buttonContent; 
      }
      else if (whichOperator !== '' && previousKey === 'calculate') { // if operator is clicked right after clicking 'enter'
        number2 = 0; 
        whichOperator = buttonContent; 
      }
      else {
        whichOperator = buttonContent; 
      }
      previousKey = 'operator'; // previous key used is an 'operator' at this point
    }

    // if the clicked button is a decimal
    if (action === 'decimal') {
      console.log('소수점 버튼');
      if (previousKey !== 'decimal' && whichOperator === '') { // if no operator has been clicked
        number1 = number1 + '.'; 
        display.textContent = display.textContent + '.'; 
      }
      else if (previousKey !== 'decimal' && whichOperator !== '') { // if an operator has already been clicked
        number2 = number2 + '.'; 
        display.textContent = display.textContent + '.'; 
      }
      // if decimals are multiple times, ignore it
      previousKey = 'decimal'; // previous key used is an 'decimal' at this point
    }

    // if the clicked button is an 'AC'
    if (action === 'clear') {
      console.log('초기화 버튼');

      // reset the calculation values
      number1 = 0;
      number2 = 0;
      whichOperator = '';
      
      // reset the display to '0'
      display.textContent = '0';

      previousKey = 'clear'; // previous key used is an 'clear' at this point
    }

    // if the clicked button is an 'Enter'
    if (action === 'calculate') {
      console.log('계산 버튼');
      let answer = calculate(Number(number1), whichOperator, Number(number2)); // make a calculation

      if (previousKey === 'number' && number2 === 0) { // if Enter is pressed only with 1 operand value (no value in number2)
        display.textContent = number1; 
      }
      else if (previousKey === 'number' && number2 !== 0) { // if Enter is pressed with both operand values
        display.textContent = answer; 
        number1 = answer; 
      }
      else if (previousKey === 'calculate' && number2 !== 0) { // if Enter is pressed multiple times with both operand values
        display.textContent = answer; 
        number1 = answer; 
      }
      else if (previousKey === 'calculate' && number2 === 0) { // if Enter is pressed multiple times with 1 operand value (no value in number2)
        answer = number1; 
        display.textContent = answer; 
      }
      else if (previousKey === 'operator') { // if Enter is pressed after an operator
        answer = calculate(Number(number1), whichOperator, Number(number1)); // make a calculation of number1 value with number1 value instead of it with number2
        display.textContent = answer; 
        number1 = answer; 
      }
      previousKey = 'calculate'; // previous key used is an 'calculate' at this point
    }
  }
});
