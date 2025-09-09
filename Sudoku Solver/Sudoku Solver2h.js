document.addEventListener('DOMContentLoaded', function() {
  // Common Sudoku Functions
  function solveSudoku(board) {
    const emptyCell = findEmptyCell(board);
    if (!emptyCell) return true;
    
    const [row, col] = emptyCell;
    
    for (let num = 1; num <= 9; num++) {
      if (isValidPlacement(board, row, col, num)) {
        board[row][col] = num;
        
        if (solveSudoku(board)) return true;
        
        board[row][col] = 0;
      }
    }
    
    return false;
  }
  
  function findEmptyCell(board) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) return [i, j];
      }
    }
    return null;
  }
  
  function isValidPlacement(board, row, col, num) {
    // Check row
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num) return false;
    }
    
    // Check column
    for (let i = 0; i < 9; i++) {
      if (board[i][col] === num) return false;
    }
    
    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[boxRow + i][boxCol + j] === num) return false;
      }
    }
    
    return true;
  }
  
  function isSolvable(board) {
    // First check if the current board is valid
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] !== 0) {
          const num = board[i][j];
          board[i][j] = 0;
          
          if (!isValidPlacement(board, i, j, num)) {
            board[i][j] = num;
            return false;
          }
          
          board[i][j] = num;
        }
      }
    }
    
    // Then check if it's solvable
    const boardCopy = JSON.parse(JSON.stringify(board));
    return solveSudoku(boardCopy);
  }
  
  // Solver Section Logic
  const solverBoard = document.getElementById('solver-board');
  const solverMessage = document.getElementById('solver-message');
  const solverNumpad = document.getElementById('solver-numpad');
  const verifyBtn = document.getElementById('verify');
  const solveSolverBtn = document.getElementById('solve-solver');
  const resetSolverBtn = document.getElementById('reset-solver');
  
  let solverSelectedCell = null;
  let solverSolution = null;
  let isSolverSolved = false;
  let solverUserInput = Array(9).fill().map(() => Array(9).fill(false));
  
  function initializeSolverBoard() {
    solverBoard.innerHTML = '';
    solverUserInput = Array(9).fill().map(() => Array(9).fill(false));
    for (let i = 0; i < 81; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;
      
      if ((i % 9) % 3 === 2 && (i % 9) < 8) {
        cell.classList.add('border-right-3');
      }
      if (Math.floor(i / 9) % 3 === 2 && Math.floor(i / 9) < 8) {
        cell.classList.add('border-bottom-3');
      }
      
      cell.addEventListener('click', () => selectSolverCell(cell));
      solverBoard.appendChild(cell);
    }
  }
  
  function selectSolverCell(cell) {
    if (solverSelectedCell) {
      solverSelectedCell.classList.remove('selected');
    }
    solverSelectedCell = cell;
    cell.classList.add('selected');
  }
  
  function displaySolverBoard(boardData, isSolution = false) {
    const cells = solverBoard.querySelectorAll('.cell');
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const index = i * 9 + j;
        if (boardData[i][j] !== 0) {
          cells[index].textContent = boardData[i][j];
          
          if (isSolution) {
            if (solverUserInput[i][j]) {
              cells[index].classList.add('solver-user-input');
            } else {
              cells[index].classList.add('solver-solution');
            }
            cells[index].classList.remove('user-input');
          } else {
            cells[index].classList.add('solver-user-input');
            cells[index].classList.remove('solver-solution');
            solverUserInput[i][j] = true;
          }
        } else {
          cells[index].textContent = '';
          cells[index].classList.remove('solver-user-input', 'solver-solution');
          solverUserInput[i][j] = false;
        }
      }
    }
  }
  
  function verifySolverPuzzle() {
    const currentBoard = getSolverBoard();
    
    let isEmpty = true;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (currentBoard[i][j] !== 0) {
          isEmpty = false;
          break;
        }
      }
      if (!isEmpty) break;
    }
    
    if (isEmpty) {
      showSolverMessage('Please enter a puzzle to verify.', 'error');
      return;
    }
    
    setTimeout(() => {
      if (isSolvable(currentBoard)) {
        showSolverMessage('This puzzle is solvable!', 'success');
      } else {
        showSolverMessage('This puzzle cannot be solved.', 'error');
      }
    }, 100);
  }
  
  function solveSolverPuzzle() {
    const currentBoard = getSolverBoard();
    
    let isEmpty = true;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (currentBoard[i][j] !== 0) {
          isEmpty = false;
          break;
        }
      }
      if (!isEmpty) break;
    }
    
    if (isEmpty) {
      showSolverMessage('Please enter a puzzle to solve.', 'error');
      return;
    }
    
    setTimeout(() => {
      if (!isSolvable(currentBoard)) {
        showSolverMessage('This puzzle cannot be solved!', 'error');
        return;
      }
      
      solverSolution = JSON.parse(JSON.stringify(currentBoard));
      solveSudoku(solverSolution);
      displaySolverBoard(solverSolution, true);
      isSolverSolved = true;
      
      showSolverMessage('Puzzle solved!', 'success');
    }, 100);
  }
  
  function getSolverBoard() {
    const cells = solverBoard.querySelectorAll('.cell');
    const board = Array(9).fill().map(() => Array(9).fill(0));
    
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const index = i * 9 + j;
        board[i][j] = cells[index].textContent ? parseInt(cells[index].textContent) : 0;
      }
    }
    
    return board;
  }
  
  function showSolverMessage(text, type) {
    solverMessage.textContent = text;
    solverMessage.className = 'message';
    solverMessage.classList.add(type);
  }
  
  function resetSolverBoard() {
    const cells = solverBoard.querySelectorAll('.cell');
    cells.forEach(cell => {
      cell.textContent = '';
      cell.classList.remove('solver-user-input', 'solver-solution', 'selected');
    });
    solverSelectedCell = null;
    solverSolution = null;
    isSolverSolved = false;
    solverUserInput = Array(9).fill().map(() => Array(9).fill(false));
    showSolverMessage('Board has been reset. Enter a new puzzle.', 'info');
  }
  
  function handleSolverKeyInput(event) {
    if (!solverSelectedCell || isSolverSolved) return;
    
    // Arrow key navigation
    if (event.key.startsWith('Arrow')) {
      event.preventDefault();
      let newIndex = parseInt(solverSelectedCell.dataset.index);
      
      switch(event.key) {
        case 'ArrowUp': newIndex -= 9; break;
        case 'ArrowDown': newIndex += 9; break;
        case 'ArrowLeft': newIndex -= 1; break;
        case 'ArrowRight': newIndex += 1; break;
      }
      
      if (newIndex >= 0 && newIndex < 81) {
        const cells = solverBoard.querySelectorAll('.cell');
        selectSolverCell(cells[newIndex]);
      }
      return;
    }
    
    if (event.key >= '1' && event.key <= '9') {
      const value = parseInt(event.key);
      solverSelectedCell.textContent = value;
      solverSelectedCell.classList.add('solver-user-input');
      solverSelectedCell.classList.remove('solver-solution');
      
      // Mark this as user input
      const index = parseInt(solverSelectedCell.dataset.index);
      const row = Math.floor(index / 9);
      const col = index % 9;
      solverUserInput[row][col] = true;
    } else if (event.key === '0' || event.key === 'Backspace' || event.key === 'Delete') {
      solverSelectedCell.textContent = '';
      solverSelectedCell.classList.remove('solver-user-input', 'solver-solution');
      
      // Mark this as not user input
      const index = parseInt(solverSelectedCell.dataset.index);
      const row = Math.floor(index / 9);
      const col = index % 9;
      solverUserInput[row][col] = false;
    }
  }
  
  // Event listeners
  verifyBtn.addEventListener('click', verifySolverPuzzle);
  
  solveSolverBtn.addEventListener('click', solveSolverPuzzle);
  
  resetSolverBtn.addEventListener('click', resetSolverBoard);
  
  solverNumpad.addEventListener('click', (e) => {
    if (e.target.classList.contains('numpad-btn') && solverSelectedCell && !isSolverSolved) {
      const value = parseInt(e.target.dataset.value);
      
      if (value === 0) {
        solverSelectedCell.textContent = '';
        solverSelectedCell.classList.remove('solver-user-input', 'solver-solution');
        
        // Mark this as not user input
        const index = parseInt(solverSelectedCell.dataset.index);
        const row = Math.floor(index / 9);
        const col = index % 9;
        solverUserInput[row][col] = false;
      } else {
        solverSelectedCell.textContent = value;
        solverSelectedCell.classList.add('solver-user-input');
        solverSelectedCell.classList.remove('solver-solution');
        
        // Mark this as user input
        const index = parseInt(solverSelectedCell.dataset.index);
        const row = Math.floor(index / 9);
        const col = index % 9;
        solverUserInput[row][col] = true;
      }
    }
  });
  
  // Add keyboard event listener
  document.addEventListener('keydown', handleSolverKeyInput);
  
  // Initialize the solver
  initializeSolverBoard();
});