

// Prime Digit Sum Numbers
function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

function isPrimeAndSumOfDigitsIsPrime(num) {
  const digits = num.toString().split("").map(Number);
  const sumOfDigits = digits.reduce((acc, curr) => {return acc + curr}, 0);
  if (isPrime(num)) {
    if (isPrime(sumOfDigits)) return true;
  }
  return false;
}

function findAllPrimesWithPrimeDigitSums(start, end) {
  let primesWithPrimeDigitSums = [];
  for (let i = start; i <= end; i++) {
    if (isPrimeAndSumOfDigitsIsPrime(i)) {
      primesWithPrimeDigitSums.push(i);
    }
  }
  return primesWithPrimeDigitSums;
}
console.log(isPrime(56));
console.log(isPrimeAndSumOfDigitsIsPrime(11));
console.log(findAllPrimesWithPrimeDigitSums(1, 1000));
