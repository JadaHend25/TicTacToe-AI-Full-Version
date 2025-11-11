import React, { useState, useEffect, useCallback } from 'react';
import type { BoardState, Player, Difficulty, Scores, GameMode } from './types';
import { checkWinner, isBoardFull } from './services/gameLogic';
import { chooseAiMove } from './services/ai';
import Board from './components/Board';
import GameControls from './components/GameControls';
import Scoreboard from './components/Scoreboard';
import StatusDisplay from './components/StatusDisplay';

const INITIAL_BOARD: BoardState = Array(9).fill(null);
const INITIAL_SCORES: Scores = { x: 0, o: 0, draw: 0 };

const App: React.FC = () => {
  const [board, setBoard] = useState<BoardState>(INITIAL_BOARD);
  const [difficulty, setDifficulty] = useState<Difficulty>('Hard');
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [scores, setScores] = useState<Scores>(INITIAL_SCORES);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [gameMode, setGameMode] = useState<GameMode>('pva');
  const [humanPlayer, setHumanPlayer] = useState<Player>('X');
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');

  const aiPlayer: Player = humanPlayer === 'X' ? 'O' : 'X';

  const handleGameEnd = useCallback((currentWinner: Player | 'Draw' | null) => {
    if (!currentWinner) return;
    setWinner(currentWinner);
    setScores(prev => {
      if (currentWinner === 'X') return { ...prev, x: prev.x + 1 };
      if (currentWinner === 'O') return { ...prev, o: prev.o + 1 };
      return { ...prev, draw: prev.draw + 1 };
    });
  }, []);

  useEffect(() => {
    const isAiTurn =
      (gameMode === 'pva' && currentPlayer === aiPlayer) || gameMode === 'ava';

    if (!isAiTurn || winner) return;

    setIsThinking(true);

    const timer = setTimeout(() => {
      const newBoard = [...board];
      const move = chooseAiMove(newBoard, difficulty, currentPlayer);

      if (move !== null) {
        newBoard[move] = currentPlayer;
        setBoard(newBoard);

        const result = checkWinner(newBoard);
        if (result) {
          handleGameEnd(result.winner);
          setWinningLine(result.line);
        } else if (isBoardFull(newBoard)) {
          handleGameEnd('Draw');
        } else {
          setCurrentPlayer(prev => (prev === 'X' ? 'O' : 'X'));
        }
      }

      setIsThinking(false);

      if (
        gameMode === 'ava' &&
        (!checkWinner(newBoard) && !isBoardFull(newBoard))
      ) {
        // Loop continues via effect
      } else if (
        gameMode === 'ava' &&
        (checkWinner(newBoard) || isBoardFull(newBoard))
      ) {
        setTimeout(() => resetGame(false), 2000);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [board, currentPlayer, winner, difficulty, gameMode, aiPlayer, handleGameEnd]);

  const handleCellClick = (index: number) => {
    const isPlayerTurn =
      gameMode === 'pvp' ||
      (gameMode === 'pva' && currentPlayer === humanPlayer);

    if (board[index] || !isPlayerTurn || winner || isThinking) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      handleGameEnd(result.winner);
      setWinningLine(result.line);
    } else if (isBoardFull(newBoard)) {
      handleGameEnd('Draw');
    } else {
      setCurrentPlayer(prev => (prev === 'X' ? 'O' : 'X'));
    }
  };

  const resetGame = (resetScores: boolean = false) => {
    setBoard(INITIAL_BOARD);
    setCurrentPlayer('X');
    setWinner(null);
    setWinningLine(null);
    setIsThinking(false);
    if (resetScores) setScores(INITIAL_SCORES);
  };

  const handleGameModeChange = (mode: GameMode) => {
    setGameMode(mode);
    resetGame(true);
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    resetGame(true);
  };

  const handleHumanPlayerChange = (symbol: Player) => {
    setHumanPlayer(symbol);
    resetGame(true);
  };

  const getScoreboardLabels = (): {
    playerXLabel: string;
    playerOLabel: string;
  } => {
    switch (gameMode) {
      case 'pva':
        return humanPlayer === 'X'
          ? { playerXLabel: 'You (X)', playerOLabel: 'AI (O)' }
          : { playerXLabel: 'AI (X)', playerOLabel: 'You (O)' };
      case 'pvp':
        return { playerXLabel: 'Player (X)', playerOLabel: 'Player (O)' };
      case 'ava':
        return { playerXLabel: 'AI (X)', playerOLabel: 'AI (O)' };
      default:
        return { playerXLabel: 'Player (X)', playerOLabel: 'Player (O)' };
    }
  };

  const { playerXLabel, playerOLabel } = getScoreboardLabels();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 font-sans">
      <header className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-wider drop-shadow-lg">
          Tic-Tac-Toe AI
        </h1>
        <p className="text-slate-400 mt-2">Can you outsmart the machine?</p>
      </header>

      <main className="w-full max-w-md bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 ring-1 ring-slate-700/50">
        <StatusDisplay
          winner={winner}
          currentPlayer={currentPlayer}
          isThinking={isThinking}
        />
        <Board
          board={board}
          onCellClick={handleCellClick}
          winningLine={winningLine}
          disabled={!!winner || isThinking}
        />
        <Scoreboard
          scores={scores}
          playerXLabel={playerXLabel}
          playerOLabel={playerOLabel}
        />
        <GameControls
          onReset={() => resetGame(false)}
          onDifficultyChange={handleDifficultyChange}
          difficulty={difficulty}
          onGameModeChange={handleGameModeChange}
          gameMode={gameMode}
          onHumanPlayerChange={handleHumanPlayerChange}
          humanPlayer={humanPlayer}
        />
      </main>

      <footer className="mt-8 text-center text-slate-500 text-sm">
        <p>Built with React, TypeScript &amp; Tailwind CSS (Minimax + heuristics)</p>
      </footer>
    </div>
  );
};

export default App;
