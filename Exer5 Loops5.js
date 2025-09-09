
// Factorial Calculator and Sum of Digits of Factorial
function factorialCalc(num) {
  let result = 1;
  for (let i = 1; i <= num; i++) {
    result *= i;
  }
  console.log("The factorial of " + num + " is " + result.toLocaleString('en-US'))
  return result;
}

function sumOfDigitsOfFactorial(num) {
  let sum = 0;
  const digits = factorialCalc(num).toString().split("");
  const newValue = digits.map(Number);
  
  for (let index = 0; index < newValue.length; index++) {
    sum += newValue[index];
  }
  console.log("The sum of digits of the factorial of " + num + " is " + sum);
  return sum;
}


sumOfDigitsOfFactorial(20);













