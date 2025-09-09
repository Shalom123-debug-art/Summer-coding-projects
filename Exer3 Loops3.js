
// Factorial of Multiple Numbers in a Range
function factorialOfNumbers(n) {
  let result = 1;
  for (let i = 0; i <= n; i++) {
    if (i > 0) {
      result *= i;
      console.log("The factorial of " + i + " is " + result);
    } else if (i = 0){
      console.log("The factorial of " + i + " is 1");
    } else {
      console.log("Type a correct number!")
    }
  }
  return result;
}

factorialOfNumbers(20);




