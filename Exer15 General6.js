
//Number Pattern Analyzer: Prime, Happy, Palindromic, Narcissistic
function analyze(num) {
  let properties = {
    Prime: false,
    Happy: false,
    Palindrome: false,
    Narcissistic: false
  }
  properties["Prime"] = isPrime(num);
  properties["Happy"] = isHappy(num);
  properties["Palindrome"] = isPalindrome(num);
  properties["Narcissistic"] = isNarcissistic(num);
  return properties;
}

function isPrime(num, verbose = true) {
  if (num <= 1) {
    if (verbose) {
      console.log("Neither prime nor composite");
    }
    return false;
  } else {
    for (let dividend = 2; dividend < num; dividend++) {
      if (num % dividend === 0) {
        return false;
      }
    } 
  }
  return true;
}

function isHappy(num) {
  let seen = new Set();
  while((num !== 1) && (!seen.has(num))) {
    seen.add(num);
    num = num.toString().split('').map(Number).reduce((acc, curr) => (curr ** 2) + acc, 0);
  }
  return num === 1;
}

function isPalindrome(num) {
  const digits = num.toString();
  return digits === digits.split('').reverse().join('');
}

function isNarcissistic(num) {
  let digits = num.toString().split('').map(Number);
  let len = digits.length;
  return num === digits.reduce((acc, digit) => (digit ** len) + acc, 0);
}




console.log(analyze(13));
console.log(analyze(153));