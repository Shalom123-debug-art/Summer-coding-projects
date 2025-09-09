
// Palindromic Number Checker and Palindromic Numbers Finder in a Range
function isPalindrome(num) {
  const forwardDigits = num.toString();
  const backwardDigits = forwardDigits.split('').reverse().join('');
  if (forwardDigits === backwardDigits) {
    return true;
  } else {
    return false;
  }
}

console.log(isPalindrome(242));

function findPalindromes(start, end) {
  let palindromes = [];
  for (let i = start; i <= end; i++) {
    if (isPalindrome(i)) {
      palindromes.push(i);
    }
  }
  return palindromes;
}

console.log(findPalindromes(1000, 2000));