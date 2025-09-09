
// Perfect Squares and Perfect Cubes Finder in a Range
function checkForPerfectSquaresAndPerfectCubes(n) {
  let perfectSquares = [];
  let perfectCubes = [];
  
  for (let h = 1; h <= n; h++) {
    const j = h ** 2;
    if ((j >= 1) && (j <= n)) {
      perfectSquares.push(" " + j);
    }
    
  }

  for (let i = 1; i <= n; i++) {
    const k = i ** 3;
    if ((k >= 1) && (k <= n)) {
      perfectCubes.push(" " + k);
    }
  }

  let pSquares;
  const lastPsElement = perfectSquares[perfectSquares.length - 1];
  if (perfectSquares.length > 2) {
    pSquares = perfectSquares.with(perfectSquares.length - 1, " and " + lastPsElement);
  } else if (perfectSquares.length === 2) {
    pSquares = perfectSquares.with(perfectSquares.length - 1, " and " + lastPsElement);
    pSquares = pSquares.join(" ");
  } else if (perfectSquares.length === 1) {
    pSquares = perfectSquares;
  }
  
  let pCubes;
  const lastPcElement = perfectCubes[perfectCubes.length - 1];
  if (perfectCubes.length > 2) {
    pCubes = perfectCubes.with(perfectCubes.length - 1, " and " + lastPcElement);
  } else if (perfectCubes.length === 2) {
    pCubes = perfectCubes.with(perfectCubes.length - 1, " and " + lastPcElement);
    pCubes = pCubes.join(" ");
  } else if (perfectCubes.length === 1) {
    pCubes = perfectCubes;
  }
  

  console.log("There are " + perfectSquares.length + " perfect squares and " + perfectCubes.length + " perfect cubes in the range of 1 to " + n);
  console.log("The perfect squares are: " + pSquares);
  console.log("The perfect cubes are: " + pCubes);

}

checkForPerfectSquaresAndPerfectCubes(100);

