import React from 'react';
import type { Difficulty, GameMode, Player } from '../types';

interface GameControlsProps {
  onReset: () => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
  difficulty: Difficulty;
  onGameModeChange: (mode: GameMode) => void;
  gameMode: GameMode;
  onHumanPlayerChange: (symbol: Player) => void;
  humanPlayer: Player;
}

const ControlButton = ({
  onClick,
  isActive,
  children,
}: {
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
}) => {
  const baseClasses =
    'w-full text-sm font-bold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500';
  const activeClasses = 'bg-indigo-600 text-white';
  const inactiveClasses = 'bg-slate-700 hover:bg-slate-600 text-slate-300';
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {children}
    </button>
  );
};

const GameControls: React.FC<GameControlsProps> = ({
  onReset,
  onDifficultyChange,
  difficulty,
  onGameModeChange,
  gameMode,
  onHumanPlayerChange,
  humanPlayer,
}) => {
  return (
    <div className="mt-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-2">Game Mode</label>
        <div className="grid grid-cols-3 gap-2">
          <ControlButton onClick={() => onGameModeChange('pva')} isActive={gameMode === 'pva'}>
            Vs AI
          </ControlButton>
          <ControlButton onClick={() => onGameModeChange('pvp')} isActive={gameMode === 'pvp'}>
            Vs Player
          </ControlButton>
          <ControlButton onClick={() => onGameModeChange('ava')} isActive={gameMode === 'ava'}>
            AI vs AI
          </ControlButton>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {gameMode === 'pva' && (
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
              Your Symbol
            </label>
            <div className="grid grid-cols-2 gap-2">
              <ControlButton
                onClick={() => onHumanPlayerChange('X')}
                isActive={humanPlayer === 'X'}
              >
                X
              </ControlButton>
              <ControlButton
                onClick={() => onHumanPlayerChange('O')}
                isActive={humanPlayer === 'O'}
              >
                O
              </ControlButton>
            </div>
          </div>
        )}

        {(gameMode === 'pva' || gameMode === 'ava') && (
          <div className={gameMode === 'ava' ? 'col-span-2' : ''}>
            <label className="block text-sm font-medium text-slate-400 mb-2">
              AI Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => onDifficultyChange(e.target.value as Difficulty)}
              className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        )}
      </div>

      <button
        onClick={onReset}
        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500"
      >
        New Game
      </button>
    </div>
  );
};

export default GameControls;
