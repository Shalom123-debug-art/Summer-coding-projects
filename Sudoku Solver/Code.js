/*
// Prime Check and Factor Discovery 
function isPrime(num, verbose = false) {
  if (num <= 1) {
    console.log("Neither Prime nor Composite");
    return false;
  }
  for (let dividend = 2; dividend < num; dividend++) {
    if ((num % dividend) === 0) {
      if (verbose) {
        console.log("The number " + num + " isn't prime and it's divisible by " + dividend);
      }
      return false;
    }
  }
  if (verbose) {
    console.log("The number " + num + " is prime");
  }
  return true;
}

function factorsOfNumber(num) {
  let factors = [1];
  let primeStatus = isPrime(num, false)
  if (!primeStatus) {
    for (let factor = 2; factor < num; factor++) {
      if ((num % factor) === 0) {
        factors.push(factor);
        
      }
    }
    factors.push(num);
  } else if (primeStatus) {
    factors.push(num);
  }
  if (num === 1) return [1];
  return factors;
}

isPrime(20, true)
console.log(factorsOfNumber(5));



// Printing Pyramids 
function pyramidFigure(num) {
  const asteriks = "*"
  for (let i = 1; i <= num; i++) {
    let spaces = num - i;
    pyramid = " ".repeat(spaces) + asteriks + asteriks.repeat(2 * i - 2);
    console.log(pyramid);
  }
  return;
}

pyramidFigure(20);



// Collatz Conjecture Checker
function collatzTracker(num) {
  let seen = new Set();
  let steps = 0;
  console.log(num.toLocaleString("en-US"));
  while(!seen.has(num) && num !== 1) {
    seen.add(num);
    num = collatzSteps(num);
    steps++;
  }
  console.log("It reaches 1 in " + steps + " steps");
  return num === 1;
}

function collatzSteps(num) {
  if (num % 2 === 0) {
    num = num / 2;
    console.log(num.toLocaleString("en-US"));
  } else {
    num = num * 3 + 1;
    console.log(num.toLocaleString("en-US"));
  }
  return num;
}


collatzTracker(1234567893583729);




// Kaprekar Routine Cycle Detector
function kaprekarRoutineDetector(num) {
  let steps = 0;
  const digits = num.toString().split("").map(Number);
  if (digits.length !== 4) {
    console.log("Please type a 4-digit number");
    return;
  }
  let seen = new Set();
  while (!seen.has(num) && (num !== 6174) && (num !== 0)) {
    seen.add(num); 
    num = kaprekarSteps(num);
    steps++;
  }
  if (num !== 6174) {
    console.log("The number never becomes 6174");
  } else {
    console.log("It reached 6174 in " + steps + " steps");
  }
}
function kaprekarSteps(num) {
  const newNum = num.toString().padStart(4, "0");
  const des = newNum.toString().split("").sort((a, b) => b - a).join("");
  const asc = newNum.toString().split("").sort((a, b) => a - b).join("");
  const diff = des - asc;
  console.log(des + " - " + asc + " = " + diff);
  return diff;
}

kaprekarRoutineDetector(1000);
*/