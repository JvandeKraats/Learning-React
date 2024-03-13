import { useState } from 'react';
import { Square } from './Square';
import { Board } from './Board';

export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares){
    const newHistory = history.slice();
    newHistory[newHistory.length] = nextSquares;
    setHistory(newHistory);
    setXIsNext(!xIsNext);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
}