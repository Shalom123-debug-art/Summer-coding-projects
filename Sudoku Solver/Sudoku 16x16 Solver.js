document.addEventListener('DOMContentLoaded', function () {
  const SIZE = 16;
  const BOX_SIZE = 4;
  const SYMBOLS = [...Array(9).keys()].map(i => i + 1).concat(['A', 'B', 'C', 'D', 'E', 'F']);

  function solveSudoku(board) {
    const emptyCell = findCellWithFewestPossibilities(board);
    if (!emptyCell) return true;
    const [row, col] = emptyCell;
    for (let symbol of SYMBOLS) {
      if (isValidPlacement(board, row, col, symbol)) {
        board[row][col] = symbol;
        if (solveSudoku(board)) return true;
        board[row][col] = 0;
      }
    }
    return false;
  }

  function findCellWithFewestPossibilities(board) {
    let minOptions = SIZE + 1;
    let bestCell = null;
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (board[i][j] === 0) {
          let options = 0;
          for (let symbol of SYMBOLS) {
            if (isValidPlacement(board, i, j, symbol)) options++;
          }
          if (options < minOptions) {
            minOptions = options;
            bestCell = [i, j];
            if (minOptions === 1) return bestCell;
          }
        }
      }
    }
    return bestCell;
  }

  function isValidPlacement(board, row, col, symbol) {
    for (let i = 0; i < SIZE; i++) {
      if (board[i][col] === symbol || board[row][i] === symbol) return false;
    }

    const boxRow = Math.floor(row / BOX_SIZE) * BOX_SIZE;
    const boxCol = Math.floor(col / BOX_SIZE) * BOX_SIZE;
    for (let i = 0; i < BOX_SIZE; i++) {
      for (let j = 0; j < BOX_SIZE; j++) {
        if (board[boxRow + i][boxCol + j] === symbol) return false;
      }
    }
    return true;
  }

  function isSolvable(board) {
    const boardCopy = JSON.parse(JSON.stringify(board));
    return solveSudoku(boardCopy);
  }

  const solverBoard = document.getElementById("solver-board");
  const solverMessage = document.getElementById("solver-message");
  const solverNumpad = document.getElementById("solver-numpad");
  const verifyBtn = document.getElementById("verify");
  const solveSolverBtn = document.getElementById("solve-solver");
  const resetSolverBtn = document.getElementById("reset-solver");

  let solverSelectedCell = null;
  let solverSolution = null;
  let isSolverSolved = false;
  let solverUserInput = Array(SIZE).fill().map(() => Array(SIZE).fill(false));

  function initializeSolverBoard() {
    solverBoard.innerHTML = "";
    solverUserInput = Array(SIZE).fill().map(() => Array(SIZE).fill(false));
    for (let i = 0; i < SIZE * SIZE; i++) {
      const cell = document.createElement('div');
      cell.classList.add("cell");
      cell.dataset.index = i;
      if ((i % SIZE) % BOX_SIZE === BOX_SIZE - 1 && (i % SIZE) < SIZE - 1) {
        cell.classList.add("border-right-3");
      }
      if ((Math.floor(i / SIZE) % BOX_SIZE === BOX_SIZE - 1) && (Math.floor(i / SIZE) < SIZE - 1)) {
        cell.classList.add("border-bottom-3");
      }
      cell.addEventListener('click', () => selectSolverCell(cell));
      solverBoard.appendChild(cell);
    }
  }

  function selectSolverCell(cell) {
    if (solverSelectedCell) {
      solverSelectedCell.classList.remove("selected");
    }
    solverSelectedCell = cell;
    cell.classList.add("selected");
  }

  function displaySolverBoard(boardData, isSolution = false) {
    const cells = solverBoard.querySelectorAll(".cell");
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        const index = i * SIZE + j;
        const val = boardData[i][j];
        cells[index].textContent = val !== 0 ? val : "";
        if (isSolution) {
          if (solverUserInput[i][j]) {
            cells[index].classList.add("solver-user-input");
          } else {
            cells[index].classList.add("solver-solution");
          }
          cells[index].classList.remove("user-input");
        } else {
          cells[index].classList.remove("solver-solution");
          solverUserInput[i][j] = val !== 0;
        }
      }
    }
  }

  function getSolverBoard() {
    const cells = solverBoard.querySelectorAll(".cell");
    const board = Array(SIZE).fill().map(() => Array(SIZE).fill(0));
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        const index = i * SIZE + j;
        const text = cells[index].textContent;
        board[i][j] = text ? (isNaN(text) ? text : parseInt(text)) : 0;
      }
    }
    return board;
  }

  function verifySolverPuzzle() {
    const currentBoard = getSolverBoard();
    let isEmpty = currentBoard.every(row => row.every(cell => cell === 0));
    if (isEmpty) {
      showSolverMessage("Please enter at least one number!", "error");
      return;
    }
    setTimeout(() => {
      showSolverMessage(isSolvable(currentBoard) ? 'This puzzle is solvable!' : 'This puzzle cannot be solved.', isSolvable(currentBoard) ? 'success' : 'error');
    }, 100);
  }

  function solveSolverPuzzle() {
    const currentBoard = getSolverBoard();
    let isEmpty = currentBoard.every(row => row.every(cell => cell === 0));
    if (isEmpty) {
      showSolverMessage("Please enter at least one number!", "error");
      return;
    }
    setTimeout(() => {
      if (!isSolvable(currentBoard)) {
        showSolverMessage("This puzzle cannot be solved.", "error");
        return;
      }
      solverSolution = JSON.parse(JSON.stringify(currentBoard));
      solveSudoku(solverSolution);
      displaySolverBoard(solverSolution, true);
      isSolverSolved = true;
      showSolverMessage("Puzzle solved!", "success");
    }, 100);
  }

  function showSolverMessage(text, type) {
    solverMessage.textContent = text;
    solverMessage.className = "message";
    solverMessage.classList.add(type);
  }

  function resetSolverBoard() {
    const cells = solverBoard.querySelectorAll(".cell");
    cells.forEach(cell => {
      cell.textContent = "";
      cell.classList.remove("solver-user-input", "solver-solution", "selected");
    });
    solverSelectedCell = null;
    solverSolution = null;
    isSolverSolved = false;
    solverUserInput = Array(SIZE).fill().map(() => Array(SIZE).fill(false));
    showSolverMessage("The board has been reset. You can now enter a new puzzle.", "info");
  }

  function handleSolverKeyInput(event) {
    if (isSolverSolved || !solverSelectedCell) return;
    const key = event.key.toUpperCase();
    if (event.key.startsWith("Arrow")) {
      event.preventDefault();
      const cells = solverBoard.querySelectorAll(".cell");
      let newIndex = parseInt(solverSelectedCell.dataset.index);
      switch (event.key) {
        case "ArrowUp": newIndex -= SIZE; break;
        case "ArrowLeft": newIndex -= 1; break;
        case "ArrowDown": newIndex += SIZE; break;
        case "ArrowRight": newIndex += 1; break;
      }
      if ((newIndex >= 0) && (newIndex < SIZE * SIZE)) {
        selectSolverCell(cells[newIndex]);
      }
      return;
    }

    if ((key >= "1" && key <= "9") || ["A", "B", "C", "D", "E", "F"].includes(key)) {
      solverSelectedCell.textContent = key;
      solverSelectedCell.classList.add("solver-user-input");
      solverSelectedCell.classList.remove("solver-solution");
      const index = parseInt(solverSelectedCell.dataset.index);
      const row = Math.floor(index / SIZE);
      const col = index % SIZE;
      solverUserInput[row][col] = true;
    } else if (event.key === "0" || event.key === "Backspace" || event.key === "Delete") {
      solverSelectedCell.textContent = "";
      solverSelectedCell.classList.remove("solver-user-input", "solver-solution");
      const index = parseInt(solverSelectedCell.dataset.index);
      const row = Math.floor(index / SIZE);
      const col = index % SIZE;
      solverUserInput[row][col] = false;
    }
  }

  verifyBtn.addEventListener('click', verifySolverPuzzle);
  solveSolverBtn.addEventListener('click', solveSolverPuzzle);
  resetSolverBtn.addEventListener('click', resetSolverBoard);

  document.addEventListener('keydown', handleSolverKeyInput);

  initializeSolverBoard();
});
