import React from 'react';
import type { CellValue } from '../types';

interface CellProps {
  value: CellValue;
  onClick: () => void;
  isWinner: boolean;
  disabled: boolean;
}

const Cell: React.FC<CellProps> = ({ value, onClick, isWinner, disabled }) => {
  const baseClasses =
    'flex items-center justify-center text-5xl md:text-6xl font-bold rounded-lg aspect-square transition-all duration-200';
  const stateClasses = disabled
    ? 'bg-slate-700 cursor-not-allowed'
    : 'bg-slate-700/50 hover:bg-slate-700 cursor-pointer';

  const winnerClasses = isWinner ? 'bg-emerald-500/80 text-white animate-pulse' : '';

  const playerXClasses = !isWinner && value === 'X' ? 'text-cyan-400' : '';
  const playerOClasses = !isWinner && value === 'O' ? 'text-amber-400' : '';

  const symbolAnimationClasses = value ? 'scale-100 opacity-100' : 'scale-50 opacity-0';

  return (
    <button
      onClick={onClick}
      disabled={disabled || value !== null}
      className={`${baseClasses} ${stateClasses} ${winnerClasses}`}
    >
      <span
        className={`transform transition-all duration-300 ease-out ${symbolAnimationClasses} ${playerXClasses} ${playerOClasses}`}
      >
        {value}
      </span>
    </button>
  );
};

export default Cell;
