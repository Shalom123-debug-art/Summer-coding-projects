document.addEventListener('DOMContentLoaded', function() {
    // Section switching
    const sectionBtns = document.querySelectorAll('.section-btn');
    const sections = document.querySelectorAll('.section');
    
    sectionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const sectionId = btn.dataset.section + '-section';
            
            sectionBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            sections.forEach(s => s.classList.remove('active'));
            document.getElementById(sectionId).classList.add('active');
        });
    });
    
    // Common Sudoku Functions
    function generateSolvedPuzzle() {
        const grid = Array(9).fill().map(() => Array(9).fill(0));
        
        for (let i = 0; i < 9; i += 3) {
            fillBox(grid, i, i);
        }
        
        solveSudoku(grid);
        return grid;
    }
    
    function fillBox(grid, row, col) {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        shuffleArray(numbers);
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                grid[row + i][col + j] = numbers.pop();
            }
        }
    }
    
    function removeNumbers(board, count) {
        while (count > 0) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            
            if (board[row][col] !== 0) {
                board[row][col] = 0;
                count--;
            }
        }
    }
    
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
    
    // Check if a move would make the puzzle unsolvable
    function isMoveValid(board, row, col, num) {
        // First check if the move is valid in the immediate context
        if (!isValidPlacement(board, row, col, num)) {
            return false;
        }
        
        // Create a copy of the board and make the move
        const boardCopy = JSON.parse(JSON.stringify(board));
        boardCopy[row][col] = num;
        
        // Check if the resulting board is solvable
        return isSolvable(boardCopy);
    }
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // Game Section Logic
    const gameBoard = document.getElementById('game-board');
    const gameMessage = document.getElementById('game-message');
    const gameNumpad = document.getElementById('game-numpad');
    const newGameBtn = document.getElementById('new-game');
    const solveGameBtn = document.getElementById('solve-game');
    const resetGameBtn = document.getElementById('reset-game');
    const diffButtons = document.querySelectorAll('.diff-btn');
    
    let gameSelectedCell = null;
    let currentDifficulty = 'easy';
    let gameSolution = null;
    let gameOriginalBoard = Array(9).fill().map(() => Array(9).fill(0));
    let isGameSolved = false;
    let gameStarted = false;
    let hasErrorMessage = false;
    
    function initializeGameBoard() {
        gameBoard.innerHTML = '';
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
            
            cell.addEventListener('click', () => selectGameCell(cell));
            gameBoard.appendChild(cell);
        }
    }
    
    function selectGameCell(cell) {
        if (!gameStarted) return;
        
        if (gameSelectedCell) {
            gameSelectedCell.classList.remove('selected');
        }
        gameSelectedCell = cell;
        cell.classList.add('selected');
    }
    
    function generateSudoku(difficulty = 'easy') {
        showGameMessage('Generating new puzzle...', 'info');
        
        setTimeout(() => {
            gameSolution = generateSolvedPuzzle();
            const puzzle = JSON.parse(JSON.stringify(gameSolution));
            
            let cellsToRemove;
            switch(difficulty) {
                case 'easy': cellsToRemove = 40; break;
                case 'medium': cellsToRemove = 50; break;
                case 'hard': cellsToRemove = 60; break;
                default: cellsToRemove = 40;
            }
            
            removeNumbers(puzzle, cellsToRemove);
            gameOriginalBoard = JSON.parse(JSON.stringify(puzzle));
            
            displayGameBoard(puzzle);
            isGameSolved = false;
            gameStarted = true;
            hasErrorMessage = false;
            
            showGameMessage(`New ${difficulty} puzzle generated! Start solving.`, 'success');
        }, 100);
    }
    
    function displayGameBoard(boardData, isSolution = false) {
        const cells = gameBoard.querySelectorAll('.cell');
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const index = i * 9 + j;
                if (boardData[i][j] !== 0) {
                    cells[index].textContent = boardData[i][j];
                    
                    if (isSolution && gameOriginalBoard[i][j] === 0) {
                        cells[index].classList.add('user-solved');
                        cells[index].classList.remove('user-input', 'error', 'original');
                    } else if (isSolution) {
                        cells[index].classList.add('original');
                        cells[index].classList.remove('user-input', 'error', 'solved', 'user-solved');
                    } else if (gameOriginalBoard[i][j] !== 0) {
                        cells[index].classList.add('original');
                        cells[index].classList.remove('user-input', 'error', 'solved', 'user-solved');
                    } else {
                        cells[index].classList.add('user-input');
                        cells[index].classList.remove('solved', 'error', 'original', 'user-solved');
                    }
                } else {
                    cells[index].textContent = '';
                    cells[index].classList.remove('user-input', 'error', 'solved', 'original', 'user-solved');
                }
            }
        }
    }
    
    // Unified error checking and messaging
    function checkForErrors() {
        const currentBoard = getGameBoard();
        let hasErrors = false;
        
        const cells = gameBoard.querySelectorAll('.cell');
        cells.forEach(cell => cell.classList.remove('error'));
        
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (currentBoard[i][j] !== 0) {
                    const num = currentBoard[i][j];
                    currentBoard[i][j] = 0;
                    
                    if (!isValidPlacement(currentBoard, i, j, num)) {
                        hasErrors = true;
                        const index = i * 9 + j;
                        cells[index].classList.add('error');
                        cells[index].classList.add('highlight-error');
                        setTimeout(() => {
                            cells[index].classList.remove('highlight-error');
                        }, 500);
                    }
                    
                    currentBoard[i][j] = num;
                }
            }
        }
        
        // Update message based on error state
        if (hasErrors && hasErrorMessage) {
            return true;
        } else if (hasErrors) {
            showGameMessage('There are errors in your solution!', 'error');
            hasErrorMessage = true;
            return true;
        } else if (hasErrorMessage) {
            // Errors were fixed, return to normal message
            showGameMessage('Keep going! Your solution looks good so far.', 'info');
            hasErrorMessage = false;
            return false;
        }
        
        return false;
    }
    
    function validateGameBoard() {
        const currentBoard = getGameBoard();
        let hasErrors = checkForErrors();
        
        if (hasErrors) {
            showGameMessage('There are errors in your solution!', 'error');
            return false;
        }
        
        let isComplete = true;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (currentBoard[i][j] === 0) {
                    isComplete = false;
                    break;
                }
            }
            if (!isComplete) break;
        }
        
        if (isComplete) {
            // Check if the completed board matches the solution
            let isCorrect = true;
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    if (currentBoard[i][j] !== gameSolution[i][j]) {
                        isCorrect = false;
                        break;
                    }
                }
                if (!isCorrect) break;
            }
            
            if (isCorrect) {
                // VICTORY CELEBRATION!
                showGameMessage('🎉 Amazing! You solved the puzzle perfectly! 🎉', 'victory');
                isGameSolved = true;
                hasErrorMessage = false;
                
                // Add some celebration effects
                const cells = gameBoard.querySelectorAll('.cell');
                cells.forEach(cell => {
                    cell.classList.add('highlight-error');
                    setTimeout(() => {
                        cell.classList.remove('highlight-error');
                    }, 2000);
                });
                
                return true;
            } else {
                showGameMessage('Puzzle is complete but incorrect!', 'error');
                // Highlight incorrect cells
                const cells = gameBoard.querySelectorAll('.cell');
                for (let i = 0; i < 9; i++) {
                    for (let j = 0; j < 9; j++) {
                        const index = i * 9 + j;
                        if (currentBoard[i][j] !== gameSolution[i][j]) {
                            cells[index].classList.add('error');
                            cells[index].classList.add('highlight-error');
                        }
                    }
                }
                return false;
            }
        } else {
            showGameMessage('Keep going! Your solution looks good so far.', 'info');
            hasErrorMessage = false;
            return false;
        }
    }
    
    function getGameBoard() {
        const cells = gameBoard.querySelectorAll('.cell');
        const board = Array(9).fill().map(() => Array(9).fill(0));
        
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const index = i * 9 + j;
                board[i][j] = cells[index].textContent ? parseInt(cells[index].textContent) : 0;
            }
        }
        
        return board;
    }
    
    function showGameMessage(text, type) {
        gameMessage.textContent = text;
        gameMessage.className = 'message';
        gameMessage.classList.add(type);
    }
    
    function resetGameBoard() {
        displayGameBoard(gameOriginalBoard);
        isGameSolved = false;
        hasErrorMessage = false;
        showGameMessage('Puzzle reset to initial state.', 'info');
    }
    
    function handleGameKeyInput(event) {
        if (!gameSelectedCell || isGameSolved || !gameStarted) return;
        
        const index = parseInt(gameSelectedCell.dataset.index);
        const row = Math.floor(index / 9);
        const col = index % 9;
        
        if (gameOriginalBoard[row][col] !== 0) {
            showGameMessage('Cannot change original numbers!', 'error');
            setTimeout(() => {
                if (!hasErrorMessage) showGameMessage('Keep going! Your solution looks good so far.', 'info');
            }, 2000);
            return;
        }
        
        // Arrow key navigation
        if (event.key.startsWith('Arrow')) {
            event.preventDefault();
            let newIndex = index;
            
            switch(event.key) {
                case 'ArrowUp': newIndex = index - 9; break;
                case 'ArrowDown': newIndex = index + 9; break;
                case 'ArrowLeft': newIndex = index - 1; break;
                case 'ArrowRight': newIndex = index + 1; break;
            }
            
            if (newIndex >= 0 && newIndex < 81) {
                const cells = gameBoard.querySelectorAll('.cell');
                selectGameCell(cells[newIndex]);
            }
            return;
        }
        
        if (event.key >= '1' && event.key <= '9') {
            const value = parseInt(event.key);
            const currentBoard = getGameBoard();
            
            // Check if the move would make the puzzle unsolvable
            if (!isMoveValid(currentBoard, row, col, value)) {
                showGameMessage('This move would make the puzzle unsolvable!', 'error');
                hasErrorMessage = true;
                gameSelectedCell.classList.add('error');
                setTimeout(() => {
                    if (gameSelectedCell) gameSelectedCell.classList.remove('error');
                }, 1000);
                return;
            }
            
            gameSelectedCell.textContent = value;
            gameSelectedCell.classList.add('user-input');
            gameSelectedCell.classList.remove('error', 'solved');
            
            // Check for errors in real-time and update message accordingly
            setTimeout(() => {
                checkForErrors();
                // Also check if the puzzle is now complete and correct
                validateGameBoard();
            }, 100);
        } else if (event.key === '0' || event.key === 'Backspace' || event.key === 'Delete') {
            gameSelectedCell.textContent = '';
            gameSelectedCell.classList.remove('user-input', 'error', 'solved');
            
            // Check for errors in real-time and update message accordingly
            setTimeout(() => {
                checkForErrors();
            }, 100);
        }
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
    newGameBtn.addEventListener('click', () => generateSudoku(currentDifficulty));
    
    solveGameBtn.addEventListener('click', () => {
        const currentBoard = getGameBoard();
        
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
            showGameMessage('Please generate a puzzle first!', 'error');
            return;
        }
        
        setTimeout(() => {
            if (!isSolvable(currentBoard)) {
                showGameMessage('This puzzle cannot be solved!', 'error');
                return;
            }
            
            const solutionBoard = JSON.parse(JSON.stringify(currentBoard));
            solveSudoku(solutionBoard);
            displayGameBoard(solutionBoard, true);
            isGameSolved = true;
            
            showGameMessage('Puzzle solved!', 'success');
        }, 100);
    });
    
    resetGameBtn.addEventListener('click', resetGameBoard);
    
    verifyBtn.addEventListener('click', verifySolverPuzzle);
    
    solveSolverBtn.addEventListener('click', solveSolverPuzzle);
    
    resetSolverBtn.addEventListener('click', resetSolverBoard);
    
    gameNumpad.addEventListener('click', (e) => {
        if (e.target.classList.contains('numpad-btn') && gameSelectedCell && !isGameSolved && gameStarted) {
            const value = parseInt(e.target.dataset.value);
            
            const index = parseInt(gameSelectedCell.dataset.index);
            const row = Math.floor(index / 9);
            const col = index % 9;
            
            if (gameOriginalBoard[row][col] !== 0) {
                showGameMessage('Cannot change original numbers!', 'error');
                setTimeout(() => {
                    if (!hasErrorMessage) showGameMessage('Keep going! Your solution looks good so far.', 'info');
                }, 2000);
                return;
            }
            
            if (value === 0) {
                gameSelectedCell.textContent = '';
                gameSelectedCell.classList.remove('user-input', 'error', 'solved');
            } else {
                const currentBoard = getGameBoard();
                
                // Check if the move would make the puzzle unsolvable
                if (!isMoveValid(currentBoard, row, col, value)) {
                    showGameMessage('This move would make the puzzle unsolvable!', 'error');
                    hasErrorMessage = true;
                    gameSelectedCell.classList.add('error');
                    setTimeout(() => {
                        if (gameSelectedCell) gameSelectedCell.classList.remove('error');
                    }, 1000);
                    return;
                }
                
                gameSelectedCell.textContent = value;
                gameSelectedCell.classList.add('user-input');
                gameSelectedCell.classList.remove('error', 'solved');
            }
            
            // Check for errors in real-time and update message accordingly
            setTimeout(() => {
                checkForErrors();
                // Also check if the puzzle is now complete and correct
                validateGameBoard();
            }, 100);
        }
    });
    
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
    
    diffButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            diffButtons.forEach(b => b.classList.remove('active-diff'));
            btn.classList.add('active-diff');
            currentDifficulty = btn.dataset.diff;
            showGameMessage(`Difficulty set to ${currentDifficulty}`, 'info');
        });
    });
    
    // Add keyboard event listeners
    document.addEventListener('keydown', handleGameKeyInput);
    document.addEventListener('keydown', handleSolverKeyInput);
    
    // Initialize the game
    initializeGameBoard();
    initializeSolverBoard();
});