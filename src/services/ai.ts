import type { BoardState, Difficulty, Player } from '../types';
import { checkWinner, getValidMoves, isBoardFull } from './gameLogic';

const evaluate = (board: BoardState, maximizingPlayer: Player, minimizingPlayer: Player): number => {
  const winnerInfo = checkWinner(board);
  if (winnerInfo) {
    if (winnerInfo.winner === maximizingPlayer) return 10;
    if (winnerInfo.winner === minimizingPlayer) return -10;
  }
  return 0;
};

const minimax = (
  board: BoardState,
  depth: number,
  isMaximizing: boolean,
  alpha: number,
  beta: number,
  maximizingPlayer: Player,
  minimizingPlayer: Player
): number => {
  const score = evaluate(board, maximizingPlayer, minimizingPlayer);

  if (score === 10 || score === -10) return score - depth;
  if (isBoardFull(board) || depth === 0) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (const move of getValidMoves(board)) {
      board[move] = maximizingPlayer;
      best = Math.max(
        best,
        minimax(board, depth - 1, false, alpha, beta, maximizingPlayer, minimizingPlayer)
      );
      board[move] = null;
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break;
    }
    return best;
  } else {
    let best = Infinity;
    for (const move of getValidMoves(board)) {
      board[move] = minimizingPlayer;
      best = Math.min(
        best,
        minimax(board, depth - 1, true, alpha, beta, maximizingPlayer, minimizingPlayer)
      );
      board[move] = null;
      beta = Math.min(beta, best);
      if (beta <= alpha) break;
    }
    return best;
  }
};

const findBestMove = (board: BoardState, depth: number, aiPlayer: Player): number | null => {
  let bestVal = -Infinity;
  let bestMove: number | null = null;
  const moves = getValidMoves(board);
  const opponent = aiPlayer === 'X' ? 'O' : 'X';

  for (const move of moves) {
    board[move] = aiPlayer;
    const moveVal = minimax(board, depth, false, -Infinity, Infinity, aiPlayer, opponent);
    board[move] = null;

    if (moveVal > bestVal) {
      bestMove = move;
      bestVal = moveVal;
    }
  }
  return bestMove;
};

export const chooseAiMove = (board: BoardState, difficulty: Difficulty, aiPlayer: Player): number | null => {
  const validMoves = getValidMoves(board);
  if (validMoves.length === 0) return null;

  switch (difficulty) {
    case 'Easy':
      return validMoves[Math.floor(Math.random() * validMoves.length)];
    case 'Medium':
      if (Math.random() > 0.5) {
        return findBestMove(board, 2, aiPlayer);
      }
      return validMoves[Math.floor(Math.random() * validMoves.length)];
    case 'Hard':
      return findBestMove(board, 9, aiPlayer);
    default:
      return validMoves[Math.floor(Math.random() * validMoves.length)];
  }
};
