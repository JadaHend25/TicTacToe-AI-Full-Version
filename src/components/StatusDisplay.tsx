import React from 'react';
import type { Player } from '../types';

interface StatusDisplayProps {
  winner: Player | 'Draw' | null;
  currentPlayer: Player;
  isThinking: boolean;
}

const StatusDisplay: React.FC<StatusDisplayProps> = ({
  winner,
  currentPlayer,
  isThinking,
}) => {
  const getStatus = () => {
    if (winner) {
      if (winner === 'Draw') return { text: "🤝 It's a Draw! 🤝", color: 'text-slate-300' };
      if (winner === 'X') return { text: '🎉 Player X Wins! 🎉', color: 'text-emerald-400' };
      return { text: '🎉 Player O Wins! 🎉', color: 'text-emerald-400' };
    }
    if (isThinking) {
      return { text: 'AI is thinking...', color: 'text-amber-400' };
    }
    if (currentPlayer === 'X') {
      return { text: "Player X's Turn", color: 'text-cyan-400' };
    }
    return { text: "Player O's Turn", color: 'text-amber-400' };
  };

  const { text, color } = getStatus();

  return (
    <div className="h-10 flex items-center justify-center">
      <p className={`text-xl font-bold transition-colors duration-300 ${color}`}>{text}</p>
    </div>
  );
};

export default StatusDisplay;
