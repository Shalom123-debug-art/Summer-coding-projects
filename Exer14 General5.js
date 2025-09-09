
// Narcissistic (Armstrong) Numbers Detector and Narcissistic Numbers Finder in a Range
function isNarcissistic(num, verbose = true) {
  let result = 0;
  let digits = num.toString().split('').map(Number);
  let len = digits.length;
  let additionArray = digits.map(function(expValue) {
    return expValue ** len;
  })
  
  for (let i = 0; i < len; i++) {
    result += (digits[i] ** len);
  }
  
  if (verbose) {
    console.log("Breaking down " + num + "'s components: " + digits.join(' '));
    console.log("Adding: " + digits.join("^" + len + " + ") + "^" + len);
    console.log("Calculating: " + additionArray.join(' + '))
    console.log("Final result: " + result);
  }
  
  if (result === num) {
    return true;
  } else {
    return false;
  }
}


function findNarcissistic(start, end) {
  let narcissisticNumbers = [];
  for (let j = start; j <= end; j++) {
    if (isNarcissistic(j, false)) {
      narcissisticNumbers.push(j);
    }
  }
  return narcissisticNumbers;
}



console.log("Is narcissistic?", isNarcissistic(153), "\n");
console.log(findNarcissistic(1, 1000));
