

// Circular Primes
function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

function isCircularPrime(num, verbose = false) {
  let setOfDigits = new Set(num.toString().split(""));
  if (setOfDigits.size === 1) {
    if (isPrime(num)) {
      if (verbose) {
        console.log("The number " + num + " is a circular prime number.") + "\n";
      }
      return true;
    } else {
      if (verbose) {
        console.log("The number " + num + " is not a circular prime number." + "\n"); 
      }
      return false;
    }
  }
  let allCircularNumbers = [num];
  for (let i = 0; i < num.toString().length - 1; i++) {
    let endingDigits = num.toString().slice(0, i + 1);
    let rotation = num.toString().slice(i + 1) + endingDigits;
    allCircularNumbers.push(rotation);
  }
  allCircularNumbers = allCircularNumbers.map(Number);
  
  let allCircularPrimes = allCircularNumbers.every(element => isPrime(element));
  if (verbose) {
    console.log("The numbers derived when rotating " + num + " are: " + allCircularNumbers + "\n");
  }
  
  if (allCircularPrimes) {
    return true;
  } else {
    let circularNonPrimeNumbers = [];
    for (let j = 0; j < allCircularNumbers.length; j++) {
      if (!isPrime(allCircularNumbers[j])) {
        circularNonPrimeNumbers.push(allCircularNumbers[j]);
      }
    }
    if (verbose) {
      console.log("The number " + " isn't a circular prime since these rotations of it are not: " + circularNonPrimeNumbers + "\n");
    }
    return false;
  }
}

function findAllCircularPrimesInTheRangeOf(start, end) {
  console.log("\n");
  let circularPrimes = [];
  for (let i = start; i <= end; i++) {
    if (isCircularPrime(i)) {
      circularPrimes.push(i);
    }
  }
  return circularPrimes;
}
console.log(isCircularPrime(197, true));
console.log(findAllCircularPrimesInTheRangeOf(1, 1000));
