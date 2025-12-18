

// Super-Palindromes (Double Palindromes)
function isPalindrome(num) {
  const forward = num.toString().split("").map(Number).join("");
  const backward = num.toString().split("").reverse().map(Number).join("");
  if (forward === backward) return true;
  return false;
}

function isSuperPalindrome(num) {
  const squaredValue = num ** 2;
  if (isPalindrome(num)) {
    if (isPalindrome(squaredValue)) return true;
  }
  return false;
}

function findAllSuperPalinromesInTheRangeOf(start, end) {
  let superPalindromes = [];
  for (let i = start; i <= end; i++) {
    if (isSuperPalindrome(i)) {
      superPalindromes.push(i);
    }
  }
  return superPalindromes;
}
console.log(isPalindrome(14541));
console.log(isSuperPalindrome(22));
console.log(findAllSuperPalinromesInTheRangeOf(1, 10000));

