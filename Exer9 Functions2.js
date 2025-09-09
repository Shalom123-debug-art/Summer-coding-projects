
// Emotion Multiplier 
let num = 0;
let mySound = "";

function emotion(myString, myFunc) {
  console.log("I am " + myString + ", " + myFunc)
}

const myFunc = function(num, mySound) {
  let result = "";
  for (let j = 1; j <= num; j++) {
    result += mySound + " ";
  }
  result = result.slice(0, -1);
  return result + "!";
}

emotion("excited", myFunc(5, "woohoo"));
