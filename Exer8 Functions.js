
// Prime Check and Factor Discovery
function isPrime(n, printOut = true) {
  if (n <= 1) {
    if (printOut) {
      console.log("The number " + n + " is neither prime nor composite");
    }
    return false;
  }

  for (let dividend = 2; dividend < n; dividend++) {
    if (n % dividend === 0) {
      if (printOut) {
        console.log("The number " + n + " is prime and divisible by " + dividend);
      }
      return false;
    }
  }

  if (printOut) {
    console.log("The number " + n + " is prime");
  }
  return true;
}


function factorsFinder(n) {
  if (n <= 1) {
    console.log("The number " + n + " is neither prime nor composite");
  } else if (isPrime(n, false) === true) {
    console.log("The factors of the number " + n + " are 1 and itself (" + n + ")");
  } else if (isPrime(n, false) === false) {
    let factors = [1];
    for (let dividend = 2; dividend < n; dividend++) {
      if (n % dividend === 0) {
        factors.push(" " + dividend);
      }
    }
    factors.push(" and " + n);
    console.log("The factors of the number " + n + " are: " + factors);
  }
}

factorsFinder(700);
isPrime(700, true);
