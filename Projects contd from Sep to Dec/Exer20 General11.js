

// Automorphic Numbers
function getLastLenDigits(n, len) {
  const digits = n.toString().split("").map(Number);  
  let lastDigits = digits.slice(-(len));
  lastDigits = Number(lastDigits.join(""));
  return lastDigits;
}

function isAutomorphic(num) {
  const numDigits = num.toString().length;
  const squaredValue = num ** 2;
  if (getLastLenDigits(squaredValue, numDigits) === num) {
    return true;
  }
  return false;
}

function findAllAutomorphicNumbersInTheRange(start, end) {
  let automorphicNumbers = [];
  for (let i = start; i <= end; i++) {
    if (isAutomorphic(i)) {
      automorphicNumbers.push(i);
    }
  }
  return automorphicNumbers;
}
console.log(isAutomorphic(6));
console.log(getLastLenDigits(52340, 3));
console.log(findAllAutomorphicNumbersInTheRange(67, 10000));
