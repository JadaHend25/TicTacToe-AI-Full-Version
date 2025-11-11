import React from 'react';
import type { BoardState } from '../types';
import Cell from './Cell';

interface BoardProps {
  board: BoardState;
  onCellClick: (index: number) => void;
  winningLine: number[] | null;
  disabled: boolean;
}

const Board: React.FC<BoardProps> = ({ board, onCellClick, winningLine, disabled }) => {
  return (
    <div className="grid grid-cols-3 gap-3 my-6 aspect-square">
      {board.map((value, index) => (
        <Cell
          key={index}
          value={value}
          onClick={() => onCellClick(index)}
          isWinner={winningLine?.includes(index) ?? false}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

export default Board;
