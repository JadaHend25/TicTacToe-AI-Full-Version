import React from 'react';
import type { Scores } from '../types';

interface ScoreboardProps {
  scores: Scores;
  playerXLabel: string;
  playerOLabel: string;
}

const Scoreboard: React.FC<ScoreboardProps> = ({
  scores,
  playerXLabel,
  playerOLabel,
}) => {
  return (
    <div className="flex justify-around text-center p-4 bg-slate-900/50 rounded-lg mt-4">
      <div className="px-2">
        <p className="text-sm text-cyan-400 font-semibold">{playerXLabel}</p>
        <p className="text-2xl font-bold">{scores.x}</p>
      </div>
      <div className="border-l border-slate-600" />
      <div className="px-2">
        <p className="text-sm text-slate-400 font-semibold">Draws</p>
        <p className="text-2xl font-bold">{scores.draw}</p>
      </div>
      <div className="border-l border-slate-600" />
      <div className="px-2">
        <p className="text-sm text-amber-400 font-semibold">{playerOLabel}</p>
        <p className="text-2xl font-bold">{scores.o}</p>
      </div>
    </div>
  );
};

export default Scoreboard;
