

// Truncatable Primes 
function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

function sliceLeftDigits (num) {
  if (num < 10) {
    return null;
  }
  const digits = num.toString().split("").map(Number);
  const newDigits = digits.slice(1);
  num = Number(newDigits.join(""));
  return num;
}

function sliceRightDigits (num) {
  if (num < 10) {
    return null;
  }
  const digits = num.toString().split("").map(Number);
  const newDigits = digits.slice(0, -1);
  num = Number(newDigits.join(""));
  return num;
}

function isTruncatablePrime(n) {
  if (!isPrime(n)) return false;
  let collectionLeftCutValues = new Set();
  let collectionRightCutValues = new Set();
  let l = n;
  let r = n;
  while ((l !== null && r !== null) && (l.toString().length >= 2 || r.toString().length >= 2)) {
    l = sliceLeftDigits(l);
    r = sliceRightDigits(r);
    if (l !== null) collectionLeftCutValues.add(l);
    if (r !== null) collectionRightCutValues.add(r);
  }
  
  if (l !== null) collectionLeftCutValues.add(l);
  if (r !== null) collectionRightCutValues.add(r);
  let newCollectionOfLeftCutValues = [...collectionLeftCutValues].every(element => isPrime(element));
  let newCollectionOfRightCutValues = [...collectionRightCutValues].every(element => isPrime(element));
  if (newCollectionOfLeftCutValues && newCollectionOfRightCutValues) {
    return true;
  }
  return false;
}

function findAllTruncatablePrimesInTheRange(start, end) {
  let truncatablePrimes = [];
  for (let i = start; i <= end; i++) {
    if (isTruncatablePrime(i) && (i > 10)) {
      truncatablePrimes.push(i);
    }
  }
  console.log("There are " + truncatablePrimes.length + " truncatable primes in the range of " + start + " to " + end);
  return truncatablePrimes;
}
console.log(sliceLeftDigits(9034));
console.log(sliceRightDigits(35620));
console.log(isTruncatablePrime(9137));
console.log(findAllTruncatablePrimesInTheRange(1, 10000));
