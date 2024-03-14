import { useState } from 'react';
import { Square } from './Square';

export function Board({xIsNext, squares, onPlay, boardRows, boardColumns}) {
    const winner = calculateWinner(squares);
    let status = setStatus();
    let board = constructBoard();

    function setStatus(){
      if (winner) {
        return "Winner: " + winner;
      } else {
        return "Next player: " + (xIsNext ? "X" : "O");
      }
    }

    function constructSquare(i){
      return <Square key={i} value={squares[i]} onSquareClick={() => handleClick(i)} />
    }

    function constructBoard(){
      let squareIndex = 0;
      let board = [];
  
      for(let i = 0; i < boardRows; i++){
        const columnsArray = [];
        for(let j = 0; j < boardColumns; j++){
          columnsArray.push(constructSquare(squareIndex));
          squareIndex++;
        }
  
        board.push((
          <div key={i} className='board-row'>
            {columnsArray}
          </div>
        ))
      }

      return board;
    }
  
    function handleClick(i){
      if(squares[i] || calculateWinner(squares)){
        return;
      }
      const nextSquares = squares.slice();
      if (xIsNext) {
        nextSquares[i] = "X";
      } else {
        nextSquares[i] = "O";
      }
      onPlay(nextSquares);
    }
  
      return (
      <>
        <div className="status">{status}</div>
        {board}
      </>
      );
    }

    function calculateWinner(squares) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
      }