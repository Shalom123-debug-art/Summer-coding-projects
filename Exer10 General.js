
// Happy Number Checker and Happy Numbers Finder in a Range
function isHappyNumber(num) {
  let seen = new Set();
  while ((num !== 1) && (!seen.has(num))) {
    seen.add(num)
    num = sumOfSquaresOfDigits(num);
  }
  return num === 1;
}


function sumOfSquaresOfDigits(num) {
  let sum = 0;
  let digits = num.toString().split('').map(Number);
  for (let i = 0; i < digits.length; i++) {
    sum += (digits[i] ** 2);
  }
  return sum;
}


function findHappyNumbers(start, end) {
  let happyNumbers = [];
  for (let j = start; j <= end; j++) {
    if (isHappyNumber(j)) {
      happyNumbers.push(j);
    }
  }
  return happyNumbers;
}

console.log(isHappyNumber(13));
console.log(findHappyNumbers(10, 100));



