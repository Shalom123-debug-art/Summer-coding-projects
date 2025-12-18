

// Magic Squares Validator
function isValid3By3Array(array) {
  if (!Array.isArray(array)) return false;
  for (let row of array) {
    if (row.length !== 3) return false;
    for (let cell of row) {
      if ((typeof(cell) !== 'number') || !Number.isInteger(cell) || cell < 0 || cell > 9) {
        return false;
      }
    }
  }
  return true;
}

function isMagicSquare(matrix) {
  if (!isValid3By3Array(matrix)) return false;
  let mySet = new Set();
  for (let row of matrix) {
    let rowSum = row.reduce((acc, curr) => acc + curr, 0);
    mySet.add(rowSum);
  }
  for (let col = 0; col < 3; col++) {
    let colSum = 0;
    for (let row = 0; row < 3; row++) {
      colSum += matrix[row][col];
    }
    mySet.add(colSum);
  }
  let sumOf1stDiagonal = matrix[0][0] + matrix[1][1] + matrix[2][2];
  mySet.add(sumOf1stDiagonal);
  let sumOf2ndDiagonal = matrix[0][2] + matrix[1][1] + matrix[2][0];
  mySet.add(sumOf2ndDiagonal);
  if (mySet.size !== 1) {
    return false;
  }
  return true;
}
console.log(isValid3By3Array([[1,8,9],[4,5,6],[7,0,9]]));
console.log(isMagicSquare([[2,7,6], [9,5,1], [4,3,8]]));

/*
The input is an array
Each row consists of exactly 3 numbers 
Each cell has a single-digit, non-negative, integral value
The sum of each column, each row, and each diagonal is the same
*/



