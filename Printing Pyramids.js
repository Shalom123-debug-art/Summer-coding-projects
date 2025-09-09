
// Printing Pyramid Figure
function printPyramid(n) {
  const asteriks = "*";
  for (let i = 1; i <= n; i++) {
    let spaces = " ".repeat(n - i);
    let pyramid = spaces + asteriks.repeat(i) + asteriks.repeat(i - 1);
    console.log(pyramid);
  }
}
  

printPyramid(25);