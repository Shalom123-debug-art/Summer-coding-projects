
// Reverse Factorial Calculator 
function reverseFactorial(num) {
  let result = 1;
  for (let x = 1; x < num; x++) {
    result *= x;
    if (result === num) {
      console.log(num + " is the factorial of \"" + x + "\"");
      return x;
    } else if (result > num) break;
  }
  
  console.log("Please type a correct number!");
  return undefined;
}

console.log(reverseFactorial(20));