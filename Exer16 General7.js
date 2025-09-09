
// Collatz Conjecture Tracker
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

