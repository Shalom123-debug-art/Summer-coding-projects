
// Digital Root Calculator 
function digitalRoot(num) {
  let digits = num.toString().split('').map(Number);
  let result = 0;
  
  for (let i = 0; i < digits.length; i++) {
    result += digits[i];
  }
  console.log("Breaking down " + num + ": " + digits.join(" + "));
  
  console.log("Sum = " + result);
  
  if (result < 10) {
    return result;
  } else {
    return digitalRoot(result);
  }
}

console.log("Final Digital Root:", digitalRoot(23), "\n");
console.log("Final Digital Root:", digitalRoot(942), "\n");
console.log("Final Digital Root:", digitalRoot(1493), "\n");