

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