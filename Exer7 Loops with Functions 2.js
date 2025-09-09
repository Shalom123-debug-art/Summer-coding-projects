
// Sum of Squares of the Digits of a Number
function sumOfSquaresOfDigits(num) {
  let sum = 0;
  const digits = num.toString().split("").map(Number);
  for (let i = 0; i < digits.length; i++) {
    sum += digits[i] * digits[i];
  }
  return sum;
}

console.log(sumOfSquaresOfDigits(17));