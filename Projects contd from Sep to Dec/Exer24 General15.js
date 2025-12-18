

// Multiplicative Persistence
function findTheProductOfDigits(num) {
  const digits = num.toString().split("").map(Number);
  const product = digits.reduce((acc, curr) => acc * curr, 1);
  return product;
} 

function findTheMultiplicativePersistenceOf(num) {
  let persistence = 0;
  while (num >= 10) {
    num = findTheProductOfDigits(num);
    persistence += 1;
  }
  return persistence;
}
console.log(findTheProductOfDigits(56));
console.log(findTheMultiplicativePersistenceOf(389));
