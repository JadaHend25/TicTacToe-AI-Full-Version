export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type BoardState = CellValue[];

export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type GameMode = 'pva' | 'pvp' | 'ava'; // Player vs AI, Player vs Player, AI vs AI

export interface Scores {
  x: number;
  o: number;
  draw: number;
}
