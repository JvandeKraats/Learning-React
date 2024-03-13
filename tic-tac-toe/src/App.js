import { useState } from 'react';
import { Square } from './Square';
import { Board } from './Board';

export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares){
    const newHistory = history.slice(0, currentMove + 1);
    newHistory[newHistory.length] = nextSquares;
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1)
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    let isCurrentMove = move === currentMove;
    if (isCurrentMove){
      description = 'You are at move #' + move;
    }
    else if (move > 0){
      description = 'Go to move # ' + move;
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        {isCurrentMove ? 
            <span>{description}</span> : 
            <button onClick={() => jumpTo(move)}>{description}</button>
        }
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}