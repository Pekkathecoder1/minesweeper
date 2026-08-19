import { useState, useCallback, useRef, useEffect } from 'react';

const DIFFICULTIES = {
  easy:   { rows: 3,  cols: 3,  mines: 1 },
  medium: { rows: 5,  cols: 5,  mines: 5 },
  hard:   { rows: 7,  cols: 7,  mines: 10 },
};

function createEmptyBoard(rows, cols) {
  return Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => ({
      row: r,
      col: c,
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      neighborCount: 0,
    }))
  );
}

function placeMines(board, rows, cols, mines, safeRow, safeCol) {
  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
  let placed = 0;
  while (placed < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (!newBoard[r][c].isMine && !(r === safeRow && c === safeCol)) {
      newBoard[r][c].isMine = true;
      placed++;
    }
  }
  // Calculate neighbor counts
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!newBoard[r][c].isMine) {
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && newBoard[nr][nc].isMine) {
              count++;
            }
          }
        }
        newBoard[r][c].neighborCount = count;
      }
    }
  }
  return newBoard;
}

function revealCells(board, row, col, rows, cols) {
  const newBoard = board.map((r) => r.map((c) => ({ ...c })));
  const stack = [[row, col]];
  while (stack.length > 0) {
    const [r, c] = stack.pop();
    if (r < 0 || r >= rows || c < 0 || c >= cols) continue;
    const cell = newBoard[r][c];
    if (cell.isRevealed || cell.isFlagged) continue;
    cell.isRevealed = true;
    if (cell.neighborCount === 0 && !cell.isMine) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          stack.push([r + dr, c + dc]);
        }
      }
    }
  }
  return newBoard;
}

export function useMinesweeper() {
  const [difficulty, setDifficulty] = useState('easy');
  const [board, setBoard] = useState(() => {
    const { rows, cols } = DIFFICULTIES.easy;
    return createEmptyBoard(rows, cols);
  });
  const [gameState, setGameState] = useState('idle'); // idle | playing | won | lost
  const [flagCount, setFlagCount] = useState(0);
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);

  const { rows, cols, mines } = DIFFICULTIES[difficulty];

  // Timer
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [gameState]);

  const resetGame = useCallback((diff = difficulty) => {
    const { rows: r, cols: c } = DIFFICULTIES[diff];
    setBoard(createEmptyBoard(r, c));
    setGameState('idle');
    setFlagCount(0);
    setTime(0);
  }, [difficulty]);

  const changeDifficulty = useCallback((diff) => {
    setDifficulty(diff);
    const { rows: r, cols: c } = DIFFICULTIES[diff];
    setBoard(createEmptyBoard(r, c));
    setGameState('idle');
    setFlagCount(0);
    setTime(0);
  }, []);

  const handleReveal = useCallback((row, col) => {
    if (gameState === 'won' || gameState === 'lost') return;

    const cell = board[row][col];
    if (cell.isRevealed || cell.isFlagged) return;

    let nextBoard = board;
    if (gameState === 'idle') {
      nextBoard = placeMines(board, rows, cols, mines, row, col);
      setGameState('playing');
    }

    if (nextBoard[row][col].isMine) {
      // Reveal all mines
      const lostBoard = nextBoard.map((r) =>
        r.map((c) => ({
          ...c,
          isRevealed: c.isMine ? true : c.isRevealed,
        }))
      );
      setBoard(lostBoard);
      setGameState('lost');
    } else {
      const revealed = revealCells(nextBoard, row, col, rows, cols);
      setBoard(revealed);

      // Check win condition
      const totalSafe = rows * cols - mines;
      const revealedCount = revealed.flat().filter((c) => c.isRevealed && !c.isMine).length;
      if (revealedCount === totalSafe) {
        setGameState('won');
      }
    }
  }, [gameState, board, rows, cols, mines]);

  const handleFlag = useCallback((e, row, col) => {
    e.preventDefault();
    if (gameState === 'won' || gameState === 'lost' || gameState === 'idle') return;
    const cell = board[row][col];
    if (cell.isRevealed) return;
    
    const newBoard = board.map((r) => r.map((c) => ({ ...c })));
    newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
    setFlagCount((f) => f + (newBoard[row][col].isFlagged ? 1 : -1));
    setBoard(newBoard);
  }, [gameState, board]);

  return {
    board,
    gameState,
    difficulty,
    flagCount,
    minesLeft: mines - flagCount,
    time,
    rows,
    cols,
    mines,
    difficulties: DIFFICULTIES,
    handleReveal,
    handleFlag,
    resetGame,
    changeDifficulty,
  };
}
